const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dbUtil = require('./server/utils/DBUtil');
const mysql = require('mysql');
const emoji = require('node-emoji')
const cookieParser = require('cookie-parser');
const chatServer=require('./chat_server');//加载一个定制的Node模块，提供处理基于Socket.IO的服务端聊天功能
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); 
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'webchat'
});

connection.connect();
app.get('/', (req, res) => res.sendFile(__dirname + '/static/html/index.html'));

app.post('/checkUsername', function (req, res) {
    //var uname = JSON.stringify(c);
    console.log(req.body.username);
    var sql1 = 'select username from user where username = ?';
    connection.query(sql1, req.body.username, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', JSON.stringify(results));
        if (results.length === 0) {
            res.end('0');//0代表用户名不存在
        } else {
            res.end('1');
        }
    });
});

app.post('/register', function (req, res) {
  
    var sql1 = 'select username from user where username = ?';
    connection.query(sql1, req.body.username, function (error, results, fields) {
        if (error) throw error;
        if (results.length === 0) {
            var sql = 'insert into user (username, `password`,picture) values(?,?,?)';
            const params = [req.body.username, req.body.password,req.body.pictureIndex];
            connection.query(sql, params, function (err, result) {
                if(err) throw err;
            });
            res.end('0');//0表示用户名不存在，可以注册

        } else {
            res.end('1');
        }
    });
  
});

app.post('/login',function(req,res){
    var sql3 = 'select username from user where username = ? and password = ?';
    const params = [req.body.username, req.body.password];
    connection.query(sql3,params, function (error, results, fields) {
        if (error) throw error;
        if (results.length === 0) {
            res.end('0');//账号名或密码错误，不能登入
        } else {
            var sql4 = 'update user set picture =? where username = ?';
            const params1 = [req.body.pictureIndex,req.body.username];
            connection.query(sql4,params1, function (error, results, fields) {
                if (error) throw error;
            });
            res.cookie('username',req.body.username);
            res.cookie('pictureIndex',req.body.pictureIndex);
            res.end('1');

        }

    });

});

//发送ChatHomePage.html页面
app.get('/chatHomePage',function(req,res){
    res.sendFile(__dirname + '/static/html/ChatHomePage.html');
});

//为用户的聊天页面获取头像和用户名
/*app.get('/getHead',function(req,res){

        var sql5 = 'select'
});*/




var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
chatServer.listen(server); 