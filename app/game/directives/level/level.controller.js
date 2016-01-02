'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function LevelController($element, gameService)
{
    /**
     * Current Level
     * @type {string}
     */
    this.level = 0;

    this.levelPercent = 0;

    /**
     * socket service
     */
    this.gameService = gameService;

    /**
     * Element
     */
    this.$element = $element;

    //socket events
    this.gameService.on('updateGame', this._onUpdate.bind(this));
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  ON SELECTION CHANGED
LevelController.prototype._onUpdate = function(update)
{
    if (update.hasOwnProperty('level'))
    {
        if ( this.level !== update.level)
        {
            this.level = update.level;
            TweenLite.from(this.$element, 2, {'font-size': 0, ease: Elastic.easeOut});
        }
    }

    if (update.hasOwnProperty('level'))
    {
        this.levelPercent = update.levelPercent;
    }
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
LevelController.$inject = ['$element', 'gameService'];
angular.module('game').controller('LevelController', LevelController);

