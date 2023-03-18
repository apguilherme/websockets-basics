
class Sockets {
    
    constructor(io) {
        this.io = io;
        this.events();
    }

    events() {
        this.io.on('connection', (socket) => { // socket = client

            console.log("> connection, user ID:", socket.id); // id changes on every connection
            socket.emit('connected-msg', { 'msg': 'user connected', 'id': socket.id, 'timestamp': new Date().toISOString() });

            socket.on('new-client-msg', (data) => { 
                console.log('>> new-client-msg', data);
                this.io.emit('new-server-msg', data); // io send event to namespace
            })
        
        });
    }
}

module.exports = Sockets;