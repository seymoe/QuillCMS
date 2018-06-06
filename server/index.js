import express from 'express'
import mongoose from 'mongoose'
import { Nuxt, Builder } from 'nuxt'
import config from '../nuxt.config'
import siteConf from '../config/index.default'
import { log } from '../utils/util'
import serverAPI from './serverapi'
import clientAPI from './clientapi'

// Init Nuxt.js
const app = express()
const host = process.env.HOST || siteConf.host
const port = process.env.PORT || siteConf.port
const nuxt = new Nuxt(config)
const bodyParser = require('body-parser')
const db = mongoose.connection

// 连接mongoDB数据库
mongoose.connect(siteConf.DB_URL)
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  log('database opend!')
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('port', port)

// Import API Routes
app.use(`/server${siteConf.api_path}`, serverAPI)
app.use(`/client${siteConf.api_path}`, clientAPI)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
