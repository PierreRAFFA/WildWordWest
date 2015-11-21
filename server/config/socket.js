var socketio = require('socket.io');
var cookie            = require('express/node_modules/cookie');
var cookieParser = require('cookie-parser');
var game = require('../app/data/game');

/**
 * Module exports.
 */
var socket = module.exports = exports = new Socket;

/**
 * Socket constructor.
 *
 * @param {http.Server|Number|Object} http server, port or options
 * @param {Object} options
 * @api public
 */

function Socket(){
    //if (!(this instanceof Socket)) return new Socket();

    this.io             = null;
    this.userSockets =   [];

    this.rand = Math.random();

}
Socket.prototype.setServer = function(server)
{
    this.server = server;
    this.io = socketio(server);

    this.configure();
    this.listen();
}
Socket.prototype.configure = function()
{
    var self = this;

    this.io.use(function(socket, next) {
        var handshakeData = socket.request;

        if (handshakeData.headers.cookie)
        {
            // if there is, parse the cookie
            // note that you will need to use the same key to grad the
            // session id, as you specified in the Express setup.
            handshakeData.cookie = cookie.parse(handshakeData.headers.cookie);
            handshakeData.sessionId = cookieParser.signedCookie(handshakeData.cookie['connect.sid'], 'MEAN');
            console.log("handshakeData.sessionId:"+handshakeData.sessionId);
        } else {
            // if there isn't, turn down the connection with a message
            // and leave the function.
            return next('No cookie transmitted.', false);
        }
        // accept the incoming connection
        next();
    });
}
Socket.prototype.listen = function()
{
    var self = this;
    this.io.on('connection', function (socket)
    {

        //self.session = socket.handshake.session;
        //console.log(socket.request.sessionId);
        self.addUserSocket(socket);

        console.log("A new player visits the game");

        ////////////////////////////////////////////////////////////////////////
        socket.on('init', function (data)
        {
            console.log("init");
            console.log(data);
            socket.data = data;
        });

        socket.on('new', function (data, callback)
        {

            var lNumColumns = data.numColumns;
            var lNumRows    = data.numRows;
            var lLocale     = data.locale;

            console.log('on:new');
            //create the board
            var board = game.createBoard(lLocale,lNumColumns,lNumRows);
            board.once('initialized' , function(update)
            {
                //store infos in session socket
                socket.board    = board;

                //returns the newBlocks
                socket.board.visualize();

                //returns the result
                callback && callback.call(null, update);
            })
            //
            //board.on("levelUp" , function(decrementPoints,currentPoints)
            //{
            //    console.log("levelUp");
            //    socket.emit('levelUp',decrementPoints,currentPoints);
            //})
            //
            //board.once("gameOver" , function(gameTime)
            //{
            //    console.log("gameover");
            //    socket.emit('gameOver',gameTime);
            //})

        });

        ////////////////////////////////////////////////////////////////////////
        socket.on('submitWord', function (data, callback)
        {
            socket.board.analyzeWord(data);

            socket.board.once("boardUpdated" , function(update)
            {
                console.log("points after emit"+update.points);
                socket.board.visualize();

                //getNonSynchronizedBlocks return new blocks. If the word is not valid, this array is empty and nothing happens in the game
                callback && callback.call(null, update);
                //socket.emit('updateBoard',socket.board.getNonSynchronizedBlocks(),points );
            })

        });

        socket.on('disconnect', function () {
            console.log("============= USER DISCONNECTED =============");
            self.removeUserSocket(socket);
        });

    });
}
Socket.prototype.addUserSocket = function(socket)
{
    this.userSockets[socket.request.sessionId] = socket;
}
Socket.prototype.removeUserSocket = function(socket)
{
    delete this.userSockets[socket.request.sessionId];
}
Socket.prototype.getUserSessionById = function(id)
{
    return this.userSockets[id];
}
Socket.prototype.getRand = function()
{
    return this.rand;
}

