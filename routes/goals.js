
var express = require('express');
var router = express.Router();

let goals = [];

/* GET home page. */
router.get('/getGoals', function(req, res, next) {
  res.json(goals);
});

router.post('/addGoals', function(req, res, next) {
    let timestamp = Date.now()+Math.random();
    req.body.id = timestamp.toString(); 
    goals.push(req.body);
    res.json(goals);
});

router.delete('/removeGoals/:id', function(req, res, next) {
    let id = req.params.id;
    goals = goals.filter(goal => goal.id !== id);
    res.json(goals);
});

module.exports = router;
