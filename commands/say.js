const index = require('../index.js')

module.exports = message => {
  var msg = message.content
  index.commandQueue.push('say ' + message.author.username + ' said ' + msg.substr(msg.indexOf(' ') + 1))
}
