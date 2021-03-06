require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const http = require('http')
const url = require('url')

const votes = require('./web_requests/vote.js')

var commandQueue = []
var pets = []

var pets_text = fs.readFileSync('./pets.txt', 'utf-8')
pets = pets_text.split('\n')

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
  } else if (req.url === '/pet') {
    client.channels.get('637648713421946882').send('The best pet is ', {files: [pets[Math.floor(Math.random()*pets.length)]]})
  } else if (req.url === '/startvote') {
    client.channels.get('637648713421946882').send('Which is better cats or dogs, vote now with !vote cats or !vote dogs')
    votes.reset_votes();
  } else if (req.url === '/members') {
    res.write('members ')
    client.channels.get('637648713421946882').members.forEach(function(value) {
     //console.log(value.user.username)
     res.write(value.user.username + '\n')
    })
    //console.log(client.channels.get('637648713421946882').members)
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
