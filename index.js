require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const http = require('http')

var commandQueue = []

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'})
  console.log('Url used: ' + req.url)
  if (req.url === '/pop') {
    if (commandQueue.length > 0) {
      res.write(commandQueue.shift())
    } else {
      res.write('Empty')
    }
  } else if (req.url === '/ping') {
    client.channels.get('637648713421946882').send('Pong!');
  } else {
    res.write('Hello World!')
  }
  res.end()
}).listen(8080)

fs.readdir('./events/', (err, files) => {
  files.forEach(file => {
    const eventHandler = require('./events/' + file)
    const eventName = file.split('.')[0]
    client.on(eventName, arg => eventHandler(client, arg))
  })
})

client.login(process.env.BOT_TOKEN)
