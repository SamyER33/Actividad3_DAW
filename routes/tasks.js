
var express = require('express');
var router = express.Router();

let tasks = [{
  'id':'0',
  'name':'Estudiar',
  'description':'Repasar todos los contenidos',
  'dueDate':'27/05/2024'
}];

/* GET home page. */
router.get('/getTasks', function(req, res, next) {
  res.status(200).json(tasks);
});

router.post('/addTasks', function(req, res, next) {
    let timestamp = Date.now() + Math.random();
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
      req.body.id = timestamp.toString(); 
      tasks.push(req.body);
      res.status(200).json(tasks);
    } else {
      res.status(400).json({error:"No se está enviando el parámetro."});
    }
});

router.delete('/removeTasks/:id', function(req, res, next) {
    if(req.params && req.params.id){
      let id = req.params.id;
      let initialLength = tasks.length;
      tasks = tasks.filter(task => task.id !== id);
      if (tasks.length === initialLength) {
        return res.status(400).json({error: 'ID de tarea no encontrado' });
      }
      res.status(200).json(tasks);
    } else {
      res.status(400).json({error: "Parámetro ID es requerido para eliminar una tarea"});
    }
});

module.exports = router;
