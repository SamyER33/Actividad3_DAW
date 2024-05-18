
var express = require('express');
var router = express.Router();

let goals = [];

/* GET home page. */
router.get('/getGoals', function(req, res, next) {
  res.status(200).json(goals);
});

router.post('/addGoals', function(req, res, next) {
    let timestamp = Date.now()+Math.random();
    if (req.body && req.body.name && req.body.description && req.body.dueDate) {
      req.body.id = timestamp.toString();
      goals.push(req.body);
      res.status(200).json(goals);
    } else {
      res.status(400).json({ error: "No se está enviando el parámetro." });
    }
});

router.delete('/removeGoals/:id', function(req, res, next) {
  if (req.params && req.params.id) {
    let id = req.params.id;
    let initialLength = goals.length;
    goals = goals.filter(goal => goal.id !== id);
    if (goals.length === initialLength) {
      return res.status(400).json({ error: 'ID de meta no encontrado' });
    }
    res.status(200).json(goals);
  } else {
    res.status(400).json({ error: "Parámetro ID es requerido para eliminar una meta" });
  }
});

module.exports = router;
