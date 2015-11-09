'use strict';

(function (angular)
{
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////  CONSTRUCTOR
    function WildWordWestController($state, baladService)
    {
        this.$state = $state;
        this.baladService = baladService;

        this.numSecondsRemaining = 3 + 's';

        this._init();
    }
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////   INIT MAP
    WildWordWestController.prototype._init = function()
    {
        this.baladService.putOnHold(
            this._onHoldProgress.bind(this),
            this._onHoldProgress.bind(this),
            this._onHoldComplete.bind(this)
        )
    }

    WildWordWestController.prototype._onHoldProgress = function(progress)
    {
        this.numSecondsRemaining = Math.round(progress / 1000) + 's';
    }

    WildWordWestController.prototype._onHoldComplete = function()
    {
        this.$state.go('home');
    }
    ///////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////// ANGULAR REGISTERING
    WildWordWestController.$inject = ['$state', 'baladService'];
    angular.module('main').controller('WildWordWestController', WildWordWestController);

})(angular);
