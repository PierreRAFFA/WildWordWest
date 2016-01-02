'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function BoxController($element, gameService)
{

    this.$element = $element;

    this.$detonatorRed = angular.element(this.$element[0].querySelector('.image_red'));

    /**
     * socket service
     */
    this.gameService = gameService;

    this.running = false;

    //socket events
    this.gameService.on('updateGame', this._onUpdate.bind(this));

}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  SOCKET EVENTS
BoxController.prototype._onUpdate = function()
{

}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  ANIMATIONS
BoxController.prototype.startAnimate = function()
{
    if ( this.running === false && this.value > 0)
    {
        this.$detonatorRed.css('opacity', 0);
        TweenMax.to(this.$detonatorRed, 0.3, {opacity: 1, ease: Cubic.easeOut, repeat: -1, yoyo: true});
        this.running = true;
    }
}
BoxController.prototype.stopAnimate = function()
{
    if ( this.running )
    {
        TweenMax.killTweensOf(this.$detonatorRed, {opacity: 0});
        this.$detonatorRed.css('opacity', 0);
        this.running = false;
    }
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
BoxController.$inject = ['$element', 'gameService'];
angular.module('game').controller('BoxController', BoxController);

