require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const http = require('http')
const url = require('url')

var commandQueue = []
var votes = [-1, -1]
var voted = []
var voted_for = []
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
  } else if (req.url === '/pet') {
    client.channels.get('637648713421946882').send('The best pet is ', {files: [pets[Math.floor(Math.random()*pets.length)]]})
  } else if (req.url === '/startvote') {
    client.channels.get('637648713421946882').send('Which is better cats or dogs, vote now with !vote cats or !vote dogs')
    votes = [0, 0]
    voted = []
  } else {
    res.write('Hello World!')
  }
  res.end()
}).listen(8080)

function novotes() {
  return votes[0] === -1 || votes[1] === -1
}

function incCats(message) {
  if (voted.includes(message.author.id)) {
    message.reply('You can\'t vote again')
  } else {
    voted.push(message.author.id)
    votes[0] += 1
  }
}

function incDogs(message) {
  if (voted.includes(message.author.id)) {
    message.reply('You can\'t vote again')
  } else {
    voted.push(message.author.id)
    votes[1] += 1
  }
}

function displayTally() {
  if (votes[0] > votes[1]) {
    client.channels.get('637648713421946882').send('Cats are better ' + votes[0] + ' to ' + votes[1])
  } else if (votes[0] < votes[1]) {
    client.channels.get('637648713421946882').send('Dogs are better ' + votes[1] + ' to ' + votes[0])
  } else {
    client.channels.get('637648713421946882').send('Cats and dogs are equal at ' + votes[0])
  }
}

fs.readdir('./events/', (err, files) => {
  files.forEach(file => {
    const eventHandler = require('./events/' + file)
    const eventName = file.split('.')[0]
    client.on(eventName, arg => eventHandler(client, arg))
  })
})

client.login(process.env.BOT_TOKEN)

exports.commandQueue = commandQueue
exports.displayTally = displayTally
exports.incCats = incCats
exports.incDogs = incDogs
exports.novotes = novotes
