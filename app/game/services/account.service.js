'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function AccountService()
{
    /**
     * Account Name
     */
    this.uuid = null;

    /**
     * Account Name
     */
    this.name = null;

    /**
     *  Account Scores
     *  Contains best time, word, wordPoints per locale
     * @type {{}}
     */
    this.scores = {};

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
     * Account Balance ( pepitos )
     */
    this.balance;
}
///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// ANGULAR REGISTERING
AccountService.$inject = [];
angular.module('game').service('accountService', AccountService);
