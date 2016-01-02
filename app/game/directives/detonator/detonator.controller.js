'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function DetonatorController(gameService, $timeout)
{
    /**
     * The current time remaining in ms
     * @type {string}
     */
    this.points = 0;

    /**
     * Speed of points decrement ( depend on the level )
     * @type {number}
     */
    this.speed = 0;

    /**
     * Date when the game starts
     * @type {Date}
     */
    this.startDate;

    /**
     * last update date
     * @type {Date}
     */
    this.pointsModificationDate = new Date();

    /**
     * socket service
     */
    this.gameService = gameService;

    /**
     *
     * @type {number}
     */
    this.$timeout = $timeout;


    //socket events
    this.gameService.on('updateGame', this._onUpdate.bind(this));
    this.gameService.on('start', this._onStart.bind(this));


}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  SOCKET EVENTS
DetonatorController.prototype._onUpdate = function(update)
{
    if (update.hasOwnProperty('points'))
    {
        this.points += update.points;

        if ( this.speed !== 0 && this.speed !== update.speed) {

            //clear the timeout
            clearTimeout(this.$timeout);

            //force to remove points of the current time and block the loop
            this._doDecrementPoints(false);

            //update the speed
            this.speed = update.speed;

            //relaunch the countdown with the new decrement points
            this._decrementPoints();
        } else {
            this.speed = update.speed;
        }
    }
}
DetonatorController.prototype._onStart = function()
{
    this.start();
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////   START / STOP
DetonatorController.prototype.start = function()
{
    this.startDate = new Date();
    this.pointsModificationDate = new Date();
    this._decrementPoints();
}
DetonatorController.prototype.stop = function()
{
    clearTimeout(this.mTimeout);
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  COUNTDOWN
DetonatorController.prototype._decrementPoints = function()
{
    var self = this;
    this.startDate = new Date();
    this.$timeout(function() {
        self._doDecrementPoints(true);
    }, 250);
}
DetonatorController.prototype._doDecrementPoints = function(enableLoop)
{
    //compute precisely the number of points to remove ( date1 - date2 )
    var pointsToRemove = (new Date() - this.pointsModificationDate) * this.speed;
    //console.log("pointsToRemove:"+pointsToRemove);

    //remove the points
    this.points -= pointsToRemove;
    this.points = Math.max(0, Math.round(this.points));

    //update the points modification date
    this.pointsModificationDate = new Date();

    //decrement points again
    //console.log("enableLoop"+enableLoop);

    if ( enableLoop !== false)
    {
        this._decrementPoints();
    }

}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
DetonatorController.$inject = ['gameService', '$timeout'];
angular.module('game').controller('DetonatorController', DetonatorController);

