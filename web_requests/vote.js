const Discord = require('discord.js')
const client = new Discord.Client()

var votes = [-1, -1]
var voted = []

function novotes() {
  return votes[0] === -1 || votes[1] === -1
}

function reset_votes() {
  voted = []
  votes = [0, 0]
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

client.login(process.env.BOT_TOKEN)

exports.displayTally = displayTally
exports.incCats = incCats
exports.incDogs = incDogs
exports.novotes = novotes
exports.reset_votes = reset_votes
