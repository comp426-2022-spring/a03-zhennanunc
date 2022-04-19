import { coinFlips, countFlips, coinFlip, flipACoin } from "./modules/coin.mjs"

import {createRequire} from "module"
const require = createRequire(import.meta.url)

const { configFile } = require('browser-sync/dist/config')
const express = require('express')
const app = express()

var HTTP_PORT = 5000

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
    res.json({"raw" : coins, "summary" : countFlips(coins)})
})

app.get('/app/flip/call/:result', (req, res) => {
    var result = flipACoin(req.params.result)
    res.json(result)
})

app.get('/app/echo/:number', (req, res) => {
    res.status(200).json({'message': req.params.number})
})

app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
})