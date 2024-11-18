const mongoose=require("mongoose")

const taskSchema = new mongoose.Schema({
    taskname:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    startDate:{
        type:String,
        require:true
    },
    endDate:{
        type:String,
        require:true
    },
    status:{
        type:String,
        require:true
    },
    progress:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    }
})

module.exports=mongoose.model("tasks",taskSchema)