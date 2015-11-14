'use strict';


///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function HomePageController(Scores)
{
    this.Scores = Scores;

    this.scores = [];

    this._init();
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////   INIT
HomePageController.prototype._init = function()
{
    this._displayRanking();
}

HomePageController.prototype._displayRanking = function()
{
    console.log('_displayRanking');
    var self = this;
    var scores = this.Scores.getScore().query({locale:'fr_FR' , from: 0} , function() {

        self.scores = scores;

    });
}

///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// ANGULAR REGISTERING
HomePageController.$inject = ['Scores'];
angular.module('main').controller('HomePageController', HomePageController);
