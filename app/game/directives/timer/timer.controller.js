'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function TimerController(socketService, $interval)
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
    this.socketService = socketService;

    /**
     * interval for the timer
     */
    this.$interval = $interval;

    //selection events
    this.socketService.on('start', this._onStart.bind(this));
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  ON SELECTION CHANGED
TimerController.prototype._onStart = function()
{
    this.startDate = new Date();

    this._startTimer();
}
TimerController.prototype._startTimer = function()
{
    var self = this;
    this.$interval(function() {
        self._updateTime();
    }, 500)
}
TimerController.prototype._updateTime = function()
{
    this.time = new Date() - this.startDate;
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
TimerController.$inject = ['socketService', '$interval'];
angular.module('game').controller('TimerController', TimerController);

