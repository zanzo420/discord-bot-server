require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const http = require('http')
const url = require('url')

const votes = require('./web_requests/vote.js')

var pairs = []
var pets = []
var pets_text = fs.readFileSync('./pets.txt', 'utf-8')
pets = pets_text.split('\n')

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'})
  console.log('Url used: ' + req.url)
  if (req.url === '/handshake') {
    var key = Math.floor(Math.random() * 123456789)
    res.write('' + key)
    pairs.push([key, '', []])
  } else {
    var command = req.url.substring(1)
    var key = command.substring(0, command.indexOf('/'))
    command = command.substring(command.indexOf('/') + 1)

    //TODO check key is valid
    var dis_channel = '637648713421946882'//TODO work this out
    var dis_channel = ''
    var commandQueue = []
    pairs.forEach(function(value) {
      if (key === value[0]) {
        dis_channel = value[1]
        commandQueue = value[2]
      }
    })

    if (dis_channel = '') {
      res.write('Failed');
      return
    }

    if (command === 'pop') {
      if (commandQueue.length > 0) {
        res.write(commandQueue.shift())
      } else {
        res.write('Empty')
      }
    } else if (command.startsWith('send')) {
      var u = url.parse(req.url, true).query
      client.channels.get(dis_channel).send(u.message)
      res.write('Done')
    } else if (command === 'ping') {
      client.channels.get(dis_channel).send('Pong!')
      res.write('Done')
    } else if (command === 'pet') {
      client.channels.get(dis_channel).send('The best pet is ', {files: [pets[Math.floor(Math.random()*pets.length)]]})
    } else if (command  === 'startvote') {
      client.channels.get(dis_channel).send('Which is better cats or dogs, vote now with !vote cats or !vote dogs')
      votes.reset_votes();
    } else if (command === 'members') {
      res.write('members ')
      client.channels.get(dis_channel).members.forEach(function(value) {
        res.write(value.user.username + '\n')
      })
    } else {
      res.write('Hello World!')
    }
  }
  res.end()
}).listen(8080)

function addToCommandQueue(id, message) {
  var commandQueue = []
  pairs.forEach(function(value) {
    if (id === value[1]) {
      commandQueue = value[2]
    }
  })
  commandQueue.push(message)
}

fs.readdir('./events/', (err, files) => {
  files.forEach(file => {
    const eventHandler = require('./events/' + file)
    const eventName = file.split('.')[0]
    client.on(eventName, arg => eventHandler(client, arg))
  })
})

client.login(process.env.BOT_TOKEN)

exports.addToCommandQueue = addToCommandQueue
