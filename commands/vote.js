const votes = require('../web_requests/vote.js')

module.exports = message => {
  var msg = message.content
  var vote = msg.substring(msg.indexOf(' ') + 1)
  if (votes.novotes(message.channel)) {
    message.reply('There\'s nothing to vote for!')
  } else {
    if (vote === 'cats') {
      votes.incCats(message.channel, message)
    } else if (vote === 'dogs') {
      votes.incDogs(message.channel, message)
    } else {
      message.reply('You can\'t vote for that')
    }
    votes.displayTally(message.channel)
  }
}
