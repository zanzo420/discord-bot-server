const ping = require('../commands/ping')
const say = require('../commands/say')
const play = require('../commands/play')

module.exports = (client, msg) => {
  if (msg.content.startsWith('!play')) {
    play(msg)
  }
  if (msg.content.startsWith('!say')) {
    say(msg)
  }
  if (msg.content === 'ping') {
    ping(msg)
  }
}
