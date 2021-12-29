var views = require('./views.js')
var express = require('express');

var app = express();
app.set('view engine', 'pug');
app.set('views','./src/templates');

app.use('/css', express.static('./src/css'));
app.use('/js', express.static('./src/js'));

app.get('/', views.index);
app.listen(3000);