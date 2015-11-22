'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function DetonatorController($element, socketService)
{

    this.$element = $element;

    this.$detonatorRed = angular.element(this.$element[0].querySelector('.image_red'));

    /**
     * socket service
     */
    this.socketService = socketService;

    this.running = false;

    //socket events
    this.socketService.on('updateGame', this._onUpdate.bind(this));

}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  SOCKET EVENTS
DetonatorController.prototype._onUpdate = function()
{

}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  ANIMATIONS
DetonatorController.prototype.startAnimate = function()
{
    if ( this.running === false && this.value > 0)
    {
        this.$detonatorRed.css('opacity', 0);
        TweenMax.to(this.$detonatorRed, 0.3, {opacity: 1, ease: Cubic.easeOut, repeat: -1, yoyo: true});
        this.running = true;
    }
}
DetonatorController.prototype.stopAnimate = function()
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
DetonatorController.$inject = ['$element', 'socketService'];
angular.module('game').controller('DetonatorController', DetonatorController);

