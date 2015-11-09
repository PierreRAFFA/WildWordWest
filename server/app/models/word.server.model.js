var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Word = mongoose.Schema({
    word: String,
    cleanedWord: String,
    group : String
})


module.exports = function(locale)
{
    var tableName = locale.toLowerCase().replace("_" , "-") + "-words";
    return mongoose.model('Word', Word , tableName);
}

