
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

let goals = [];

const goalInit = mongoose.model('goals', {name:String, description:String, dueDate:String}, 'goals')

/* GET home page. */
router.get('/getGoals', function(req, res, next) {
  goalInit.find({}).then((response)=>
    res.status(200).json(response)).catch((err=>{
      res.status(500).json(err)}));
});

router.post('/addGoals', function(req, res, next) {
    let timestamp = Date.now()+Math.random();
    if (req.body && req.body.name && req.body.description && req.body.dueDate) {
      const goal = new goalInit(req.body);
      goal.save().then(
        () => res.status(200).json({})
      ).catch((err)=>res.status(500).json({}));
    } else {
      res.status(400).json({ error: "No se está enviando el parámetro." });
    }
});

router.delete('/removeGoals/:id', function(req, res, next) {
  if (req.params && req.params.id) {
    let id = req.params.id;
    goalInit.deleteOne({_id: new mongoose.Types.ObjectId(id)}).then((response)=>{
      res.status(200).json(200);
    }).catch((err)=>{
      res.status(500).json(err);
    })
    // let initialLength = goals.length;
    // goals = goals.filter(goal => goal.name !== id);
    // if (goals.length === initialLength) {
    //   return res.status(400).json({ error: 'ID de meta no encontrado' });
    // }
    // res.status(200).json(goals);
  } else {
    res.status(400).json({ error: "Parámetro ID es requerido para eliminar una meta" });
  }
});

module.exports = router;
