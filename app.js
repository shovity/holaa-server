const { create } = require('eroc')
const io = require('./io')

const { server } = create()

io.attach(server)
