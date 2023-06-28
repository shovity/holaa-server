```js
client = io(origin, {
  transports: ['websocket'],
  path: '/holaa/socket.io',
})

client.emit('join', {
  user: 'sho',
  channel: 'anime',
})

client.emit('message', {
  uesr: 'sho',
  channel: 'anime',
  content: 'Hi Mikasa!',
})

client.on('message', console.log)
```
