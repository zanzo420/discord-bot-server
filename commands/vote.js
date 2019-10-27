const index = require('../index.js')

module.exports = message => {
  var msg = message.content
  var vote = msg.substring(msg.indexOf(' ') + 1)
  if (index.novotes()) {
    message.reply('There\'s nothing to vote for!')
  } else {
    if (vote === 'cats') {
      index.incCats(message)
    } else if (vote === 'dogs') {
      index.incDogs(message)
    } else {
      message.reply('You can\'t vote for that')
    }
    index.displayTally()
  }
}
