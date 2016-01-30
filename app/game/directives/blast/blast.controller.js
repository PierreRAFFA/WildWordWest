'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function BlastController($scope, $element)
{
    /**
     * $element
     */
    this.$element = $element;

    /**
     * scope
     */
    this.$scope = $scope;

    /**
     * Binded size of the blast
     */
    this.size;

    this.$blast = angular.element(this.$element[0].querySelector('.blast'));

    var self = this;
    $scope.$watch('vm.active', function(value) {

        if (value === true)
        {
            self.play();
        }
    });
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  ON SELECTION CHANGED
BlastController.prototype.play = function()
{
    //the backgroundPosition is computed depending on the size of the blast
    //the blast image size is 12288 x 192px
    var initialBackgroundPosition = this.size / 192 * -12288;
    initialBackgroundPosition += 'px';

    this.$blast.css('display', 'block');
    TweenMax.to(this.$blast, 1, {
        backgroundPosition: initialBackgroundPosition,
        ease: SteppedEase.config(64),
        onComplete: this._onAnimationComplete.bind(this)
    });
}
BlastController.prototype._onAnimationComplete = function()
{
    this.$blast.css('display', 'none');
    this.$scope.$emit('blastComplete');
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
BlastController.$inject = ['$scope', '$element'];
angular.module('game').controller('BlastController', BlastController);
