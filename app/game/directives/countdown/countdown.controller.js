'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function CountdownController($element, gameService)
{

    /**
     * $element
     */
    this.$element = $element;

    /**
     * game service
     */
    this.gameService = gameService;

    /**
     * Number of seconds remaining before the game really starts.
     * @type {number}
     */
    this.numSecondsRemaining = 3;

    /**
     * Countdown text displayed
     * @type {string}
     */
    this.countdownText = '3';

    //socket events
    this.gameService.on('countdown', this._onCountdown.bind(this));

    this.$countdownText = angular.element(this.$element[0].querySelector('.text'));
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  ON SELECTION CHANGED
CountdownController.prototype._onCountdown = function()
{
    this._decrementCountdown();

}
CountdownController.prototype._decrementCountdown = function()
{
    this.numSecondsRemaining--;

    if (this.numSecondsRemaining >= 0)
    {
        this.$countdownText.text(this.numSecondsRemaining+1);
        TweenMax.set(this.$countdownText, {scale:1.5, alpha:1});
        TweenMax.to(this.$countdownText, 1, {ease: Expo.easeOut, scale:0.1, alpha:0, onComplete: this._decrementCountdown.bind(this) });
    }else{
        this.$countdownText.addClass('go');
        this.$countdownText.text('GO !!');
        TweenMax.set(this.$countdownText, {scale:0, alpha:0.5});
        TweenMax.to(this.$countdownText, 1, {ease: Expo.easeOut, scale:1.5, alpha:1, onComplete: this._undisplayCountdown.bind(this)});
    }
}
CountdownController.prototype._undisplayCountdown = function()
{
    this.$element.css('display' , 'none');
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
CountdownController.$inject = ['$element', 'gameService'];
angular.module('game').controller('CountdownController', CountdownController);

