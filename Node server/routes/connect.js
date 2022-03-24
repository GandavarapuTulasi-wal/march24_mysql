var express = require('express');
var Connector = require('../connect');
var router = express.Router();
router.get('/createtable', function (req, res) {
  console.log(Connector);
  const sql =
    'CREATE TABLE products (name varchar(50),description varchar(250),price int)';
  Connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.post('/', function (req, res) {
  const { name, description, price } = req.body;
  const sql = `INSERT INTO products VALUES ("${name}","${description}",${price})`;
  Connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.get('/', function (req, res) {
  const sql = `SELECT * FROM products`;
  Connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});

module.exports = router;
