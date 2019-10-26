require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const http = require('http')

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.write('Hello World!')
  console.log('Url used: ' + req.url)
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
