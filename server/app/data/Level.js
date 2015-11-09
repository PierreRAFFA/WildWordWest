/**
 * Module exports.
 */

module.exports = Level;

/**
 * Level constructor.
 *
 * @param { index} level index 0...4
 * @param {decrementPoints} number of points to decrease each ms
 */
function Level(index,decrementPoints)
{
    this.mIndex             = index;
    this.mDecrementPoints   = decrementPoints;
}

Level.prototype.getIndex = function()               { return this.mIndex; }
Level.prototype.getDecrementPoints = function()     { return this.mDecrementPoints; }