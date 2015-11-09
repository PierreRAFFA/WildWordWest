var Board   = require('./board.js');
//var dal     = require('./dal');

module.exports = {};
//module.exports.Account          = require("./models/account");
//module.exports.FacebookAccount  = require("./lib/server/models/facebook-account");
module.exports.Score            = require("../models/score.server.model");
//module.exports.Dal              = dal;
//module.exports.facebookSettings = require("./lib/server/facebook/settings");
////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
module.exports.createBoard = function(locale,numColumns,numRows)
{
    return new Board(locale,numColumns,numRows);
}

////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
module.exports.getScores = function(locale, from, res)
{
    console.log("module.exports.getScores");
    dal.once("scoresLoadComplete" , onScoresLoadComplete.bind(res));
    dal.getScores(locale, from);
}

function onScoresLoadComplete(scores)
{
    console.log("onScoresLoadComplete");
    console.log(scores);
    this.json({
        success: true,
        data: scores
    })
}

////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////  JOIN
//module.exports.join = function(params, res)
//{
//    console.log("join");
//
//    dal.once("joinComplete" , onJoinComplete.bind(res));
//    dal.join(params);
//}
//
//function onJoinComplete(success) {
//    console.log("onJoinComplete");
//    console.log("success:" + success);
//    if (success == false){
//        this.status(500);
//    }else{
//        module.exports.saveScore()
//    }
//
//
//    this.json({
//        success: success
//    })
//}
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// SAVE SCORE
module.exports.saveScore = function(scoreValue, locale, req, res)
{
    console.log("saveScore");

    var lAccount = req.user;
    dal.once("scoreSaved" , onScoreSaved.bind(res));
    dal.saveScore(scoreValue, locale, lAccount);
}

function onScoreSaved(success)
{
    console.log("onScoreSaved");
    console.log("success:"+success);
    if ( success == false)
        this.status(500);

    //this.status(200).send("ok");

    this.json({
        success: success
    })
}