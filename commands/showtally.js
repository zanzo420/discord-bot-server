const votes = require('../web_requests/vote.js')

module.exports = message => {
  votes.displayTally(message)
}
