require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const http = require('http')
const url = require('url')

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
  } else if (req.url.startsWith('/send')) {
    var u = url.parse(req.url, true).query
    client.channels.get('637648713421946882').send(u.message).catch(console.log("Invalid message request"))
    res.write('Done')
  } else if (req.url === '/ping') {
    client.channels.get('637648713421946882').send('Pong!')
    res.write('Done')
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
