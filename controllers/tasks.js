const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')


const getAllTasks = asyncWrapper(async (req, res) => {
    const allTasks = await Task.find({});
    res.status(200).json({ allTasks });
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task });
    
})

const getTask = asyncWrapper(async (req, res) => {
    
    const {id : taskId} = req.params;
    const findTask = await Task.findOne({_id: taskId});

    if(!findTask){
        return res.status(404).json({msg: `No task with id : ${taskId}`})
    }

    res.status(200).json({ findTask })
   
})

const deleteTask = asyncWrapper(async (req, res) => {
    
    const {id : taskId} = req.params;
    const deleteTask = await Task.findOneAndDelete({_id: taskId});

    if(!deleteTask){
        return res.status(404).json({msg: `No task with id : ${taskId}`})
    }

    res.status(200).json({ deleteTask })

   
})


const updateTask = asyncWrapper(async (req, res) => {
    
    const {id : taskId} = req.params;

    const updTask = await Task.findOneAndUpdate({_id: taskId }, req.body , {
        new: true,
        runValidators: true,
    })

    if(!updateTask){
        return res.status(404).json({msg: `No task with id : ${taskId}`})
    }
        
    res.status(200).json({ updTask })
   
})


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}