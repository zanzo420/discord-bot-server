const ping = require('../commands/ping')
const say = require('../commands/say')
const play = require('../commands/play')
const vote = require('../commands/vote')
const showtally = require('../commands/showtally')
const help = require('../commands/help')

module.exports = (client, msg) => {
  if (msg.content.startsWith('!help')) {
    help(msg)
  }
  if (msg.content.startsWith('!play')) {
    play(msg)
  }
  if (msg.content.startsWith('!vote')) {
    vote(msg)
  }
  if (msg.content.startsWith('!showtally')) {
    showtally(msg)
  }
  if (msg.content.startsWith('!say')) {
    say(msg)
  }
  if (msg.content === 'ping' || msg.content === '!ping') {
    ping(msg)
  }
}
