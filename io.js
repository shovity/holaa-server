const socketio = require('socket.io')
const Message = require('./models/Message')

const io = socketio({
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },

    transports: ['websocket'],
    path: '/holaa/socket.io',
})

io.on('connection', (socket) => {
    socket.on('join', ({ user, channel }) => {
        socket.channel = channel
        socket.user = user

        Message.find({ channel: channel })
            .limit(128)
            .lean()
            .then((messages) => {
                socket.emit('message', messages)
                socket.join(channel)
                socket.to(channel).emit('message', [{ user, message: 'Has join the channel' }])

                // console.log('user join', { user, channel, messages})
            })

    })

    socket.on('message', ({ content }) => {
        const { user, channel } = socket

        // console.log('user send message', { user, channel, content })

        if (!user || !channel) {
            return socket.disconnect()
        }

        socket.to(channel).emit('message', [{ user, content }])
        Message.create({ user, channel, content })
    })

    socket.on('disconnect', () => {
        const { user, channel } = socket

        if (channel) {
            socket.to(channel).emit('message', [{ user, message: 'Has left the channel' }])
        }
    })
})

module.exports = io
