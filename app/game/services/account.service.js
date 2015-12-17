'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function AccountService()
{
    /**
     * Account Name
     */
    this.gameCenterId = null;

    /**
     * Platform Name ( ex: ios, android )
     * @type {null}
     */
    this.platform = null;

    /**
     * Account Name
     */
    this.name = null;

    /**
     *  Account Statistics
     *  Contains best time, word, wordPoints per locale
     * @type {{}}
     */
    this.statistics = {};

    /**
     * Selected Locale. Default: en_GB
     * @type {string}
     */
    this.selectedLocale = 'en_GB';

    /**
     * Account Level
     */
    this.level;

    /**
     * Percent to complete the level
     */
    this.levelPercent;

    /**
     * Account Balance ( pepitos )
     */
    this.balance;
}
///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// ANGULAR REGISTERING
AccountService.$inject = [];
angular.module('game').service('accountService', AccountService);
