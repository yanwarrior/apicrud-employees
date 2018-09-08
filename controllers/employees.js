var express = require('express');
var router = express.Router();
var mysqlConnection = require('../configs/database.js');
const auth = require('../middlewares/auth.js')();

router.get('', auth.authenticate(), (req, res) => {
  mysqlConnection.query('SELECT * FROM employee', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      res.json(JSON.stringify(err));
    }
  });
});

router.get('/:id', auth.authenticate(), (req, res) => {
  mysqlConnection.query('SELECT * FROM employee WHERE employee_id=?', [req.params.id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      res.json(JSON.stringify(err));
    }
  });
});

router.post('', auth.authenticate(), (req, res) => {
  if (req.body.name && req.body.empcode && req.body.salary) {
    mysqlConnection.query("INSERT INTO employee (name, empcode, salary) VALUES (?, ?, ?)", [
      req.body.name, req.body.empcode, req.body.salary
    ], (err, rows, fields) => {
      if (!err) {
        res.json('Success create employee.');
      } else {
        res.json(JSON.stringify(err));
      }
    });
  } else {
    res.json("Data required.");
  }
});

router.put('/:id', auth.authenticate(), (req, res) => {
  if (req.body.name && req.body.empcode && req.body.salary) {
    mysqlConnection.query("UPDATE employee SET name=?, empcode=?, salary=? WHERE employee_id=?", [
      req.body.name, req.body.empcode, req.body.salary, req.params.id
    ], (err, rows, fields) => {
      if (!err) {
        res.json('Success update employee.');
      } else {
        res.json(JSON.stringify(err));
      }
    })
  } else {
    res.json("Data required.");
  }
});

router.delete('/:id', auth.authenticate(), (req, res) => {
  mysqlConnection.query('DELETE FROM employee WHERE employee_id=?', [req.params.id], (err, rows, fields) => {
    if (!err) {
      res.json('Deleted successfully.');
    } else {
      res.json(JSON.stringify(err));
    }
  });
});

module.exports = router;