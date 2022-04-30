import { coinFlips, countFlips, coinFlip, flipACoin } from "./modules/coin.mjs"
import minimist from 'minimist'
import express from 'express'
const app = express()


var min = minimist(process.argv.slice(2))
var port = 'port'
const HTTP_PORT = min[port] || 5000

const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', HTTP_PORT))
})

app.get('/app/', (req, res) => {
    //Respond with status 200
    res.statusCode = 200
    //Respond with status message "OK"
    res.statusMessage = 'OK'
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain'})
    res.end(res.statusCode+ ' ' +res.statusMessage)
})

app.get('/app/flip/', (req, res) => {
    res.statusCode = 200
    var flip = coinFlip()
    res.json({flip : flip})
    res.writeHead( res.statusCode, { 'Content-Type' : 'application/json'})
})

app.get('/app/flips/:number', (req, res) => {
    var coins = coinFlips(req.params.number)
    
    var headsCount = 0, tailsCount = 0
    for (var i = 0; i < coins.length; i++){
        if (coins[i].valueOf() == "heads") headsCount++
        else tailsCount++
    }

    res.json({"raw" : coins, "summary" : {"heads" : headsCount, "tails" : tailsCount}})
})

app.get('/app/flip/call/:guess', (req, res) => {
    
    var actual = coinFlip()
    let guess = req.params.guess
    let result
    if (actual.valueOf() == guess) result = "win"
    else result = "lose"

    res.json({"call" : guess, "flip" : actual, "result" : result})
})

app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
})