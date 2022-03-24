var express = require('express');
const { body } = require('express-validator');
var router = express.Router();
const connector = require('../connect');
router.get('/createtable', function (req, res) {
  console.log(connector);
  const sql = 'CREATE TABLE todos(item varchar(50),status varchar(100))';
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.get('/', function (req, res) {
  const sql = `SELECT * FROM todos`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.post('/', function (req, res) {
  const { item, status } = req.body;
  const sql = `INSERT INTO todos VALUES("${item}","${status}")`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.delete('/:item', function (req, res) {
  const sql = `DELETE  FROM todos WHERE item = "${req.params.item}"`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.get('/deleteall', function (req, res) {
  const sql = `DELETE FROM todos`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.put('/update/:item', function (req, res) {
  const sql = `UPDATE todos SET item="${req.body.item}", status="${req.body.status}" WHERE item="${req.params.item}"`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
module.exports = router;
