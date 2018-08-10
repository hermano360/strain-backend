const express = require('express')
const fs = require('fs')
const bodyParser     = require('body-parser');
const redis = require('redis')
const {recommendation} = require('./src/recommendation')
const {formatBuzzwords} = require('./src/buzzwords')



const port = process.env.port || 8000;

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/buzzwords', (req,res) => {
  res.send(formatBuzzwords())
})

app.get('/strains', (req,res) => {
  res.send(JSON.parse(fs.readFileSync('filterStrains2.json','utf-8')))
})

app.post('/strains', (req,res) => {
  res.send(recommendation(req.body.data))
})

app.listen(port, () => {
  console.log('We are live on ' + port);
});
