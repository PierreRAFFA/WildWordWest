'use strict';

(function(angular)
{

    function BlockBombController()
    {
        this.letter;
        this.type;
    }

    BlockBombController.$inject = [];
    angular.module('game').controller('BlockBombController', BlockBombController);

})(angular);

