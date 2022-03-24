var express = require('express');
const { body } = require('express-validator');
var router = express.Router();
const connector = require('../connect');
router.get('/createAuthor', function (req, res) {
  console.log(connector);
  const sql =
    'CREATE TABLE authors(first_name varchar(20),lastname varchar(50),dob date,dod date)';
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.get('/', function (req, res) {
  const sql = `SELECT * FROM authors`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.post('/', function (req, res) {
  console.log(req.body.last_name);
  const { first_name, lastname, dob, dod } = req.body;
  const sql = `INSERT INTO authors VALUES("${first_name}", "${lastname}","${dob}", "${dod}")`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.delete('/:first_name', function (req, res) {
  const sql = `DELETE  FROM authors WHERE first_name = "${req.params.first_name}"`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.get('/deleteall', function (req, res) {
  const sql = `DELETE FROM authors`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.put('/update/:item', function (req, res) {
  const sql = `UPDATE authors SET first_name="${req.body.first_name}", lastname="${req.body.lastname}",dob="${req.body.dob}",dod="${req.body.dod}" WHERE first_name="${req.params.item}"`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
module.exports = router;
