'use strict';

(function (angular)
{
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////  CONSTRUCTOR
    function BaladService($interval)
    {
        this.holdTime = 3000;
        this.$interval = $interval;

    }
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////   INIT MAP
    BaladService.prototype.putOnHold = function(onStartCallback, onProgressCallback, onCompleteCallback)
    {
        var self = this;
        var remainingTime = this.holdTime;
        var intervalTime = 500;

        onStartCallback && onStartCallback.call(null, remainingTime);

        var promise = this.$interval(function()
        {
            remainingTime -= intervalTime;

            onProgressCallback && onProgressCallback.call(null, remainingTime);

            if ( remainingTime <= 0)
            {
                self.$interval.cancel(promise);
                onCompleteCallback && onCompleteCallback.call(null);
            }
        }, intervalTime);
    }
    ///////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////// ANGULAR REGISTERING
    BaladService.$inject = ['$interval'];
    angular.module('main').service('baladService', BaladService);

})(angular);
