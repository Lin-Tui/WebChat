const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'webchat'
});

function connect() {
    connection.connect(err => {
        if (err) {
            console.log('err mysql connecting: ' + err.stack);
            return;
        }
        console.log('connected as id: ' + connection.threadId);
    });
}

function disconnect() {
    connection.end(err => {
        if (err) {
            console.log('stop mysql connection err');
            return;
        }
        console.log('stop mysql connection success');
    });
}

function select(sql, callback) {
    var results;
    connection.query(sql, (err, rows) => {
        // skip error handling
        // console.log(rows);
        // console.log(rows.length);
        // console.log(rows[0].username);
        callback(rows);
    });
    return results;
}

function selectByParams(sql, params) {
    var results;
    connection.query(sql, params, (err, rows) => {
        console.log(rows);
        results = rows;
    });
    console.log('results:' + results);
    return results;
}

const sql = 'select * from user';
const params = ['admin', '1231'];

// test
exports.connect = connect;
exports.select = select;
exports.selectByParams = selectByParams;