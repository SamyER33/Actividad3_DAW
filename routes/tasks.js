
var express = require('express');
var router = express.Router();

let tasks = [];

/* GET home page. */
router.get('/getTasks', function(req, res, next) {
  res.json(tasks);
});

router.post('/addTasks', function(req, res, next) {
    let timestamp = Date.now() + Math.random();
    req.body.id = timestamp.toString(); 
    tasks.push(req.body);
    res.json(tasks);
});

router.delete('/removeTasks/:id', function(req, res, next) {
    let id = req.params.id;
    tasks = tasks.filter(task => task.id !== id);
    res.json(tasks);
});

module.exports = router;
