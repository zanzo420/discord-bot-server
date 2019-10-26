const ping = require('../commands/ping')

module.exports = (client, msg) => {
  if (msg.content.startsWith('!play')) {
    //Tell alex to play something
  }
  if (msg.content.startsWith('!say')) {
    //Have alexa say something#
  }
  if (msg.content === 'ping') {
    ping(msg)
  }
}
