var events      = require('events');
var EventEmitter = require('events').EventEmitter;

var Block       = require('./block.js');
var Level       = require('./level.js');
var BlockType   = require('./blockType.js');
var dal         = require('./dal');
var Countdown   = require('./countdown');

var letterController = require('../controllers/letter.server.controller');

/**
 * Module exports.
 */

module.exports = Board;

/**
 * Board constructor.
 *
 * @param {locale}
 * @param {numColumns}
 * @param {numRows}
 */
function Board(locale,numColumns,numRows)
{
    /**
     * game options
     */
    this.mNumColumns    = numColumns;
    this.mNumRows       = numRows;
    this.mLocale        = locale;

    /**
     * Array of letters with frequency. used when creating block
     * @type {null}
     */
    this.letterFrequency   = null;
    /**
     * Defines the grid blocks. Array of Columns
     * @type {}
     */
    this.mGrid              = {};

    /**
     * Defines all new blocks created. This blocks have to be synchronized with the client
     * @type {Array}
     */
    this.mNonSynchronizedBlocks = [];

    /**
     * Percent of Normal, Bonus, Bomb Blocks
     * @type {number}
     */
    this.mNormalPercent      = 85;
    this.mBonusPercent       = 10;
    this.mBombPercent        = 5;

    /**
     * Data Access Layout ( access to mongoDB )
     * @type {exports}
     */
    this.mDal = dal;

    /**
     * Time in milliseconds considered as game score
     * @type {number}
     */
    this.mScore = 0;

    /**
     * Array of Level ( Level has index and decrementPoints )
     * @type {Array}
     */
    this.mLevels = [];

    /**
     * Level Index
     * @type {number}
     */
    this.mCurrentLevelIndex = 0;

    /**
     * Countdown Object
     * @type {Countdown}
     */
    this.mCountdown = null;

    /**
     * Total points used to define the level change. Start at 1200 points
     * @type {number}
     */
    this.mTotalPoints = 1200;

    /**
     * Allows to block the board when the game is over to prevent the client to continue to send words
     * @type {boolean}
     */
    this.mBlocked = false;

    this.loadLetterFrequency(locale);
}

// inherit events.EventEmitter
Board.prototype = Object.create(EventEmitter.prototype);
Board.prototype.constructor = Board;
////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////  LOAD LOCALE
/**
 * Load all about the locale
 *
 * @param {locale}
 */
Board.prototype.loadLetterFrequency = function(locale)
{
    var self = this;
    letterController.promiseList(locale).exec(function(err, letters)
    {
        self.letterFrequency = letters;
        console.log(letters);
        self.initialize();
    });
};
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// INITIALIZE
Board.prototype.initialize = function()
{
    this.mGrid.columns = [];
    for(var iC = 0 ; iC < this.mNumColumns ; iC++)
    {
        var lColumn = [];
        this.mGrid.columns.push(lColumn);
        for(var iR = 0 ; iR < this.mNumRows ; iR++)
        {
            var block = this.addBlockToColumn(iC);
            block.__row = iR;
        }
    }

    this.createLevels();

    this.emit('initialized');

    this.launchCountdown();
}
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// CREATE LEVELS
/**
 * Defines all levels of the game
 */
Board.prototype.createLevels = function()
{
    //this.mLevels.push(new Level(0,0.05));
    //this.mLevels.push(new Level(1,0.075));
    //this.mLevels.push(new Level(2,0.0975));
    //this.mLevels.push(new Level(3,0.12675));

    //this.mLevels.push(new Level(0,0.025));
    //this.mLevels.push(new Level(1,0.05));
    //this.mLevels.push(new Level(2,0.075));
    //this.mLevels.push(new Level(3,0.0975));

    this.mLevels.push(new Level(0,0.025));
    this.mLevels.push(new Level(1,0.04));
    this.mLevels.push(new Level(2,0.055));
    this.mLevels.push(new Level(3,0.07));

}
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// BLOCKS MANAGEMENT
Board.prototype.addBlockToColumn = function(column)
{

    var block = this.createBlock();
    this.mGrid.columns[column].push(block);

    this.mNonSynchronizedBlocks.push(block);
    //console.log(this.mNonSynchronizedBlocks.length);
    return block;
}
Board.prototype.createBlock = function(letter,type)
{
    console.log('createBlock');

    var letter = letter || this.defineBlockLetter();
    var lType   = type   || this.defineBlockType();

    return new Block(letter,lType);
}
Board.prototype.getNonSynchronizedBlocks = function()
{
    var blocks = this.mNonSynchronizedBlocks;
    console.log(this.mNonSynchronizedBlocks.length);
    this.mNonSynchronizedBlocks = [];
    console.log(this.mNonSynchronizedBlocks.length);

    return blocks;
}
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// BLOCK OPTION GENERATOR
/**
 * Returns a type randomly
 *
 * @returns {string}
 */
Board.prototype.defineBlockType = function ()
{
    var blockType = "";
    var float = Math.random() * 100;
    if ( float >= 100 - this.mBombPercent)
    {
        blockType = BlockType.BOMB;
    }else if ( float >= 100 - (this.mBonusPercent + this.mBombPercent))
    {
        blockType = BlockType.BONUS;
    }else if ( float >= 100 - (this.mNormalPercent + this.mBonusPercent + this.mBombPercent))
    {
        blockType = BlockType.BASIC;
    }
    return blockType;
}

/**
 * Returns a letter randomly ( depending on the frequency in the language )
 *
 * @returns {string}
 */
Board.prototype.defineBlockLetter = function ()
{
    var blockLetter = "";

    var float = Math.random() * 100;

    var pointer = 0;
    for(var index in this.letterFrequency)
    {
        var letter = this.letterFrequency[index];
        pointer += letter.frequency;

        if ( pointer > float)
        {
            blockLetter = letter.letter;
            break;
        }
    }
    console.log(blockLetter);
    return blockLetter;
}
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// RECYCLE BLOCKS AFTER REMOVE
/**
 * Renews the selected blocks to remove and create the same quantity with a letter and a type
 * @param blockPositions
 */
Board.prototype.renewBlocks = function(blockPositions)
{
    var self = this;

    //add closest block of bomb blocks
    var lExplodedBlockPositions = [];
    blockPositions.forEach(function(blockPosition)
    {
        var lColumn = blockPosition[0];
        var lRow    = blockPosition[1];

        var block = self.mGrid.columns[lColumn][lRow];
        console.log(block.getLetter() + " " + block.getType());

        if ( block.getType() == BlockType.BOMB)
        {
            var lClosestBlocks = self.getClosestBlockPositions(lColumn,lRow );
            lExplodedBlockPositions = lExplodedBlockPositions.concat(lClosestBlocks);
        }
    })

    //concat selected blocks positions and the exploded block positions
    blockPositions = blockPositions.concat(lExplodedBlockPositions);

    //make the array with unique values
    blockPositions = this.getUniquePositions(blockPositions);

    //sort by row to remove the top blocks at first
    //console.log(blocks);
    blockPositions.sort(function(a,b)
    {
        if ( a[0] < b[0])
        {
            return -1;
        }else if ( a[0] > b[0]){
            return 1;
        }else{
            return a[1] > b[1] ? -1 : 1;
        }

    });

    //remove the selected blocks and create another one
    for(var iP = 0 ; iP < blockPositions.length ; iP++)
    {
        var lPosition = blockPositions[iP];
        var lColumn = lPosition[0];
        var lRow    = lPosition[1];

        this.mGrid.columns[lColumn].splice(lRow,1);

        this.addBlockToColumn(lColumn);
    }
}

Board.prototype.getClosestBlockPositions = function(column, row)
{
    var self = this;

    console.log("getClosestBlockPositions");
    console.log("column:"+column);
    console.log("row:"+row);

    var lBLockPositions = [];

    //define the distance of the bomb impact
    var lImpactDistance = 1;

    for(var iC = column-lImpactDistance; iC <= column+lImpactDistance ; iC++)
    {
        for(var iR = row-lImpactDistance; iR <= row+lImpactDistance ; iR++)
        {
            //detect limit of the grid and ignore the block whose position is the same than the parameters
            if ( iC >= 0 && iC < self.mNumColumns
                && iR >= 0 && iR < self.mNumRows
                && (iC == column && iR == row) == false )
            {
                lBLockPositions.push([iC, iR]);
            }
        }
    }

    return lBLockPositions;
}
Board.prototype.getUniquePositions = function(positions)
{
    var lPositions = {};
    positions.forEach(function(position)
    {
        lPositions[position.toString()] = true;
    });

    var lUniqueArray = [];
    for(var lKey in lPositions)
    {
        lUniqueArray.push(lKey.split(","));
    }
    return lUniqueArray;
}
////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
/**
 * Decrements points depending on the current level with the optimized way
 * @return void
 */
Board.prototype.launchCountdown = function()
{
    var self = this;

    var lCurrentLevel = this.mLevels[this.mCurrentLevelIndex];

    this.mCountdown = new Countdown(1200);
    this.mCountdown.setDecrementPoints(lCurrentLevel.getDecrementPoints())
    this.mCountdown.start();
    this.mCountdown.once("complete" , function(countdownTime)
    {
        console.log("countdownTime:"+countdownTime);

        self.mScore = countdownTime;

        //emit gameover
        self.emit("gameOver" , countdownTime);

        //block the board
        self.mBlocked = true;
    })
}
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// ANALYZE WORD
/**
 * Analyzes the word by calling the mongodb database and emit the results with points.
 *
 * @param selectedBlocks Array of block positions
 */
Board.prototype.analyzeWord = function(selectedBlocks)
{
    var self = this;

    if( self.mBlocked == false )
    {

        if (this.isInARow(selectedBlocks)) {
            var lWord = this.getWordFromSelectedBlocks(selectedBlocks);

            this.mDal.selectWord(lWord, this.mLocale);
            this.mDal.once("wordLoadComplete", function (isValid) {
                var lPoints = 0;
                if (isValid) {
                    //compute points
                    lPoints = self.getPointsFromSelectedBlocks(selectedBlocks);
                    self.mTotalPoints += lPoints;
                    self.renewBlocks(selectedBlocks);
                } else {

                }

                //emit to the client side
                self.emit("wordAnalyzed", lPoints);

                //add points to the countdown
                self.mCountdown.addPoints(lPoints);

                //check if we need to change the level
                self.checkLevelUp();
            })
        }
    }else{
        console.log("Hey the board is blocked. No more words will be accepted !!");
    }
};
Board.prototype.isInARow = function(selectedBlocks)
{
    return true;//@TODO
};

Board.prototype.checkLevelUp = function()
{
    var lCurrentLevel = this.mLevels[this.mCurrentLevelIndex];
    if ( this.mTotalPoints > 1200 && this.mTotalPoints > 1200 + (lCurrentLevel.getIndex()+1) * 2400)
    {
        this.levelUp();
    }

};
Board.prototype.levelUp = function()
{
    if ( this.mCurrentLevelIndex < this.mLevels.length - 1 )
    {
        console.log("LLLLLEEEEEEEEEVVVVVVVEEEEEEELLLLLLLLL UUUUUUUUPPPPPPPPPPP !!!!!!!!!!!!!");

        this.mCurrentLevelIndex++;

        this.emit("levelUp" , this.mLevels[this.mCurrentLevelIndex].getDecrementPoints() , this.mCountdown.getPoints());

        this.mCountdown.setDecrementPoints(this.mLevels[this.mCurrentLevelIndex].getDecrementPoints());
    }
}
////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////  GET POINTS/WORD FROM SELECTED BLOCKS
/**
 * Compute points depending on the letters and their frequency in the language
 *
 * @param selectedBlocks
 * @returns {number}
 */
Board.prototype.getPointsFromSelectedBlocks = function(selectedBlocks)
{
    var lPoints = 0;
    for(var iP = 0 ; iP < selectedBlocks.length ; iP++)
    {
        var lPosition = selectedBlocks[iP];
        var lColumn = lPosition[0];
        var lRow    = lPosition[1];

        var block = this.mGrid.columns[lColumn][lRow];

        lPoints += this.getPointFromBlock(block);
        //console.log("lPoints total:"+lPoints);
    }

    lPoints *= selectedBlocks.length;
    lPoints = Math.round(lPoints);
    return lPoints;
}
/**
 * Returns points depending on the letter and its frequency in the language
 * @param block
 * @returns {number}
 */
Board.prototype.getPointFromBlock = function(block)
{
    var letter = block.getLetter();
    var letterFrequency = this.letterFrequency[letter];

    var lPoints = Math.sqrt(50/letterFrequency) * 4;

    if ( block.getType() == BlockType.BONUS)
    {
        lPoints *= 2;
    }
    return lPoints;
}
/**
 * Returns the word formed by the selected blocks
 * @param selectedBlocks
 * @returns {string}
 */
Board.prototype.getWordFromSelectedBlocks = function(selectedBlocks)
{
    var lWord = "";
    for(var iP = 0 ; iP < selectedBlocks.length ; iP++)
    {
        var lPosition = selectedBlocks[iP];
        var lColumn = lPosition[0];
        var lRow    = lPosition[1];

        var block = this.mGrid.columns[lColumn][lRow];

        lWord += block.getLetter();
    }

    return lWord;
}
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// GETTER
Board.prototype.getScore = function()
{
    return this.mScore;
}
Board.prototype.getLocale = function()
{
    return this.mLocale;
}
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// UTILS ( LOG )
Board.prototype.visualize = function()
{
    var lNumRows = this.mGrid.columns[0].length;

    console.log("=============");
    for(var iR = lNumRows-1 ; iR >= 0  ; iR--)
    {
        var lRow = "";
        for(var iC = 0 ; iC < this.mGrid.columns.length ; iC++)
        {
            var lColumn = this.mGrid.columns[iC];
            lRow += lColumn[iR].getLetter().toUpperCase() + " ";
        }
        console.log(lRow);

    }
    console.log("=============");
}