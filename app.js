const express = require('express')
const app = express()
const path = require('path')

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', function(requeset, response) {
  response.send('Hey')
})



app.listen(3000, function(requeset, response) {
  console.log('listening on port 3000')
})

module.export = app





// press the on button to star the Game
// lights will flash on all 4 colors
// it will make a starting sound
// level up sound when you get it right
// level down sound when you got it wrong sound
// difrene paterns and swipes instead of tap only
