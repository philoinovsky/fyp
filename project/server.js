const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const Web3 = require('web3');
const truffle_connect = require('./connection/app.js');
const bodyParser = require('body-parser');
const fs = require('fs');
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "posts"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

var curAcc = "Not Chosen";

const log_and_throw = function(err)
{
  if (err)
  {
    console.log(err);
    throw err;
  }
};

const getUserDataByID = function()
{
  var userData = new Map();
  var account = JSON.parse(fs.readFileSync('db/mapping.json'));
  for (var addr in account){
    let value = account[addr];
    let user_data = JSON.parse(fs.readFileSync(value));
    user_data['account'] = addr;
    userData.set(user_data['id'], user_data);
  }
  return userData;
};

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// set engine
app.set('view engine', 'pug');
app.set('views','./template');

app.use('/static', express.static('public_static'));

app.get('/', (req, res) => {
  console.log("**** GET / ****");
  truffle_connect.start(function (accounts) {
    res.render("index", {'nav': "", 'acc': accounts, 'curAcc': curAcc});
  });
});

app.get('/blog', (req, res) => {
  console.log("**** GET /blog ****");
  var sql = "SELECT * FROM data;"
  var userData = getUserDataByID();
  con.query(sql, function (err, result) {
    if (err) throw err;
    result = result.map(function(e) {
      e['user'] = userData.get(e['user_id'].toString())['username'];
      e['content'] = e['content'].slice(0, 150) + '...';
      e['time'] = e['time'].getFullYear() + '.' + (e['time'].getMonth() + 1) + '.' + e['time'].getDate();
      return e;
    });
    truffle_connect.start(function (accounts) {
      res.render("blog", {'nav': "blog", 'posts': result, 'acc': accounts, 'curAcc': curAcc});
    });
  });
});

app.get('/post.:postid', (req, res) => {
  console.log("**** GET /post ****");
  var post_id = req.params.postid;
  var sql = "SELECT * FROM data WHERE id = " + post_id + ";";
  var userData = getUserDataByID();
  con.query(sql, function (err, result) {
    let post = result[0];
    post['user'] = userData.get(post['user_id'].toString())['username'];
    post['time'] = post['time'].getFullYear() + '.' + (post['time'].getMonth() + 1) + '.' + post['time'].getDate();
    if (err) throw err;
    truffle_connect.start(function (accounts) {
      res.render("post", {'nav': "blog", 'post': post, 'acc': accounts, 'curAcc': curAcc});
    });
  });
});

app.get('/chooseAccount.:addr', (req, res) => {
  console.log("**** GET /chooseAccount ****");
  curAcc = req.params.addr;
  res.writeHead(301, {
    Location: "/"
  }).end();
});

// database view
app.get('/database.:address', (req, res) => {
  console.log("**** GET /database ****");
  fs.readFile('db/mapping.json', (err, data) => {
    log_and_throw(err);
    let account = JSON.parse(data);
    let file_path = account[req.params.address]
    fs.readFile(file_path, (err, data) => {
      log_and_throw(err);
      let user_data = JSON.parse(data);
      res.render("database", user_data);
    });
  });
});

// database save
app.post('/database.:address', (req, res) => {
  console.log("**** POST /database ****");
  fs.readFile('db/mapping.json', (err, data) => {
    log_and_throw(err);
    let account = JSON.parse(data);
    let file_path = account[req.params.address]
    let json_str = JSON.stringify(req.body);
    fs.writeFile(file_path, json_str, () => {
      res.redirect('/database.'+req.params.address);
    });
  });
});

app.get('/getAccounts', (req, res) => {
  console.log("**** GET /getAccounts ****");
  truffle_connect.start(function (answer) {
    res.send(answer);
  })
});

app.post('/getBalance', (req, res) => {
  console.log("**** GET /getBalance ****");
  console.log(req.body);
  let currentAcount = req.body.account;

  truffle_connect.refreshBalance(currentAcount, (answer) => {
    let account_balance = answer;
    truffle_connect.start(function(answer){
      // get list of all accounts and send it along with the response
      let all_accounts = answer;
      response = [account_balance, all_accounts]
      res.send(response);
    });
  });
});

app.post('/sendCoin', (req, res) => {
  console.log("**** GET /sendCoin ****");
  console.log(req.body);

  let amount = req.body.amount;
  let sender = req.body.sender;
  let receiver = req.body.receiver;

  truffle_connect.sendCoin(amount, sender, receiver, (balance) => {
    res.send(balance);
  });
});

app.listen(port, '0.0.0.0', () => {

  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));

  console.log("Express Listening at http://128.199.235.174:" + port);

});
