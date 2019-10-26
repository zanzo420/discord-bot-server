require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const http = require('http')
const url = require('url')

var commandQueue = []

var pets = ['https://media.giphy.com/media/WYEWpk4lRPDq0/giphy.gif',
'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif',
'http://giphygifs.s3.amazonaws.com/media/33OrjzUFwkwEg/giphy.gif',
'https://media.giphy.com/media/8vQSQ3cNXuDGo/giphy.gif',
'https://media.giphy.com/media/13WXyMa9yz2bUA/giphy.gif',
'https://media.giphy.com/media/13ByqbM0hgfN7y/giphy-downsized-large.gif',
'http://giphygifs.s3.amazonaws.com/media/6TPIcnnwkq6SA/giphy.gif',
'https://media.giphy.com/media/qanpmMeeaa0Ni/giphy-downsized-large.gif',
'http://giphygifs.s3.amazonaws.com/media/7jsnB2RRzDGIo/giphy.gif',
'https://media.giphy.com/media/xfs2eBhQ6ujgA/giphy.gif']

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
    client.channels.get('637648713421946882').send(u.message)
    res.write('Done')
  } else if (req.url === '/ping') {
    client.channels.get('637648713421946882').send('Pong!')
    res.write('Done')
  } else if (req.url == '/pet') {
    client.channels.get('637648713421946882').send('The best pet is ', {files: [pets[Math.floor(Math.random()*pets.length)]]})
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

exports.commandQueue = commandQueue
