'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function LeverController($element)
{

    this.$element = $element;

    this.value;

    this.counter = 10;
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  SOCKET EVENTS
LeverController.prototype.updateLever = function()
{
    //if ( this.counter-- === 0 )
    //{
        var height = this.$element[0].querySelector('.wildLever').clientHeight;
        var maxY = height * 0.6;

        var a = -maxY / 3500;
        var b = 3500;
        var newY = a * this.value + maxY;
        newY = Math.max(0,newY);
        newY = newY + 'px';

        TweenLite.to(this.$element[0].querySelector('.wildLever'), 0.25, {top: newY, ease: Linear.easeOut});
        this.counter = 10;
    //}

}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
LeverController.$inject = ['$element'];
angular.module('game').controller('LeverController', LeverController);

