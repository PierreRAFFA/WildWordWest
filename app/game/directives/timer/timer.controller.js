'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function TimerController(gameService, $interval)
{
    /**
     * Time to display
     * @type {string}
     */
    this.time = '';

    /**
     * Date at start
     * @type {Date}
     */
    this.startDate = new Date();

    /**
     * Socket service
     */
    this.gameService = gameService;

    /**
     * interval for the timer
     */
    this.$interval = $interval;

    /**
     * Interval id created by $interval
     */
    this._intervalId;

    //selection events
    this.gameService.on('start', this._onStart.bind(this));
    this.gameService.on('gameOver', this._onGameOver.bind(this));
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  ON GAME START
TimerController.prototype._onStart = function()
{
    this.startDate = new Date();

    this._startTimer();
}
TimerController.prototype._startTimer = function()
{
    var self = this;
    this._intervalId = this.$interval(function() {
        self._updateTime();
    }, 500)
}
TimerController.prototype._updateTime = function()
{
    this.time = new Date() - this.startDate;
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  ON GAME OVER
TimerController.prototype._onGameOver = function(time)
{
    this.$interval.cancel(this._intervalId);
    this.time = time;
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
TimerController.$inject = ['gameService', '$interval'];
angular.module('game').controller('TimerController', TimerController);

