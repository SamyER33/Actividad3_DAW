
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

let tasks = [{
  'id':'0',
  'name':'Estudiar',
  'description':'Repasar todos los contenidos',
  'dueDate':'27/05/2024'
}];

const taskInit = mongoose.model('tasks', {name:String, description:String, dueDate:String}, 'tasks')

/* GET home page. */
router.get('/getTasks', function(req, res, next) {
  taskInit.find({}).then((response)=>
    res.status(200).json(response)).catch((err=>{
      res.status(500).json(err)}));
});

router.post('/addTasks', function(req, res, next) {
    let timestamp = Date.now() + Math.random();
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
      const task = new taskInit(req.body);
      task.save().then(
        () => res.status(200).json({})
      ).catch((err)=>res.status(500).json({}));
    } else {
      res.status(400).json({error:"No se está enviando el parámetro."});
    }
});

router.delete('/removeTasks/:id', function(req, res, next) {
    if(req.params && req.params.id){
      let id = req.params.id;
      taskInit.deleteOne({_id: new mongoose.Types.ObjectId(id)}).then((response)=>{
        res.status(200).json(200);
      }).catch((err)=>{
        res.status(500).json(err);
      })
      // let initialLength = tasks.length;
      // tasks = tasks.filter(task => task.id !== id);
      // if (tasks.length === initialLength) {
      //   return res.status(400).json({error: 'ID de tarea no encontrado' });
      // }
      // res.status(200).json(tasks);
    } else {
      res.status(400).json({error: "Parámetro ID es requerido para eliminar una tarea"});
    }
});

module.exports = router;
