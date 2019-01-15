var express = require('express');
var path = require('path');

var app = express();

// 利用express.static中间件来托管静态资源。
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(8088, () => {
    console.log('start: 8088')
}) 