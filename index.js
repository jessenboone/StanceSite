const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');


var app = module.exports = express();
var connectionString = 'postgres://postgres:@localhost/Stance';
var massiveInstance = massive.connectSync({connectionString : connectionString})

app.set('db', massiveInstance);
var db = app.get('db',
  console.log("database set")
);

app.use(bodyParser.json());
app.use(cors());


app.get('/api/products/', function(req, res){
  console.log(res);
  res.send(res);
})


const port = 3000;
app.listen(port, function(){
  console.log("Ship Docked On", port)
})
