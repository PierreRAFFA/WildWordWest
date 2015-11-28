'use strict';

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function LoadingPageController($state, baladService)
{
    this.$state = $state;
    this.baladService = baladService;

    this.numSecondsRemaining = 3 + 's';

    //this._init();
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////   INIT MAP
LoadingPageController.prototype._init = function()
{
    this.baladService.putOnHold(
        this._onHoldProgress.bind(this),
        this._onHoldProgress.bind(this),
        this._onHoldComplete.bind(this)
    )
}

LoadingPageController.prototype._onHoldProgress = function(progress)
{
    this.numSecondsRemaining = Math.round(progress / 1000) + 's';
}

LoadingPageController.prototype._onHoldComplete = function()
{
    this.$state.go('home');
}
///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// ANGULAR REGISTERING
LoadingPageController.$inject = ['$state', 'baladService'];
angular.module('main').controller('LoadingPageController', LoadingPageController);
