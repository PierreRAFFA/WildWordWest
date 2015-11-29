'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function RankingController($scope, Accounts)
{
    this.$scope = $scope;
    this.Accounts = Accounts;

    /**
     * Binded Locale
     */
    this.locale;

    /**
     * Score List
     * @type {Array}
     */
    this.scores = [];

    this.activate();

}
RankingController.prototype.activate = function()
{
    var self = this;
    this.$scope.$watch('vm.locale', function(value)
    {
        self.locale = value;
        self.loadRanking();
    });
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  ON SELECTION CHANGED
RankingController.prototype.loadRanking = function()
{
    console.log('loadRanking');

    var self = this;
    var scores = this.Accounts.getHighestTime().query({locale: this.locale}, function()
    {
        self.scores = scores;
    });
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
RankingController.$inject = ['$scope', 'Accounts'];
angular.module('game').controller('RankingController', RankingController);

