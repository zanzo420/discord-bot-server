const index = require('../index.js')

module.exports = message => {
  var msg = message.content
  message.reply("That command isn't implemented yet")
  //index.commandQueue.push('play ' + msg.substr(msg.indexOf(' ') + 1))
}
