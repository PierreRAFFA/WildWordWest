'use strict';

////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// CONSTRUCTOR
function BlockBombController($scope, $element, $window, selectionService, gameService, socketService)
{
    BlockNormalController.call(this, $element, $window, selectionService, gameService, socketService);
    /**
     *
     */
    this.letter;

    /**
     *
     */
    this.type;

    this.removed = false;

    this.$scope = $scope;

    this.animateColor();
}
BlockBombController.prototype = Object.create(BlockNormalController.prototype);
BlockBombController.prototype.constructor = BlockBombController;

////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// COLOR ANIMATION
BlockBombController.prototype.animateColor = function()
{
    var $fireBlock = angular.element(this.$element[0].querySelector('.fire'));
    TweenMax.to($fireBlock, 0.7 + Math.random() * 0.1, {opacity: 0.8, ease: Power2.easeInOut, repeat: -1, yoyo: true});
}
////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
BlockBombController.prototype.remove = function()
{
    this.removed = true;

    var $container = angular.element(this.$element[0].querySelector('.container'));
    $container.css('display', 'none');

    var $letter = angular.element(this.$element[0].querySelector('.letter'));
    $letter.css('display', 'none');

    var self = this;
    this.$scope.$on('blastComplete', function() {
        console.log('blastComplete');
        BlockNormalController.prototype.remove.call(self);
    });

}
////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
BlockBombController.$inject = ['$scope', '$element', '$window', 'selectionService', 'gameService', 'socketService'];
angular.module('game').controller('BlockBombController', BlockBombController);
