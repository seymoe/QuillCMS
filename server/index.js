import express from 'express'
import mongoose from 'mongoose'
const bodyParser = require('body-parser')
import { Nuxt, Builder } from 'nuxt'

// 连接mongoDB数据库
const url = 'mongodb://127.0.0.1:27017/zhejingxuan'
mongoose.connect(url)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('database opend!')
})


import serverAPI from './serverapi'
import clientAPI from './clientapi'

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('port', port)

// Import API Routes
app.use('/server/api', serverAPI)
app.use('/client/api', clientAPI)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
