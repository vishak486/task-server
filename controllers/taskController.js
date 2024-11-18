const tasks=require('../models/taskModel')

exports.addTaskController=async(req,res)=>{
    console.log("Inside addTaskController");
    const userId=req.userId
    const {taskname,description,startDate,endDate,status,progress}=req.body
    let newProgress=""
    if (status == "Not Started") {
        newProgress = "0%"
    } else if (status == "Started") {
        newProgress = "25%"

    } else if (status == "Half Completed") {
        newProgress = "50%"

    } if (status == "Completed") {
        newProgress = "100%"
    }

    try
    {
        const newTask= new tasks({
            taskname,description,startDate,endDate,status,progress:newProgress,userId
        })
        await newTask.save()
        res.status(200).json(newTask)
    }
    catch(err)
    {
        console.log(err);
    }
   
}

exports.viewTaskController=async(req,res)=>{
    console.log("Inside viewTaskController");
    const userId=req.userId
    try{
        const userTasks= await tasks.find({userId})
        console.log(userTasks);
        res.status(200).json(userTasks)
    }
    catch(err)
    {
        res.status(401).json(err)
    }

}

exports.updateTaskController=async(req,res)=>{
    console.log("Inside updateTaskController");
    const id=req.params.id
    const userId=req.userId
    const {taskname,description,startDate,endDate,status,progress}=req.body
    let updateProgress=""
    if (status == "Not Started") {
        updateProgress = "0%"
    } else if (status == "Started") {
        updateProgress = "25%"

    } else if (status == "Half Completed") {
        updateProgress = "50%"

    } if (status == "Completed") {
        updateProgress = "100%"
    }

    try
    {
        const updateTask= await tasks.findByIdAndUpdate({_id:id},{taskname,description,startDate,endDate,status,progress:updateProgress,userId},{new:true})
        await updateTask.save()
        res.status(200).json(updateTask)
    }
    catch(err)
    {
        res.status(400).json(err)
    }
}

// remove task
exports.deleteTaskController = async (req, res) => {
    console.log("Inside deleteTaskController");
    const id = req.params.id
    try {
        const deleteTask = await tasks.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteTask)
    } catch (error) {
        res.status(400).json(error)
    }
}