require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router=require('./routes/router')
require('./database/dbConnection')

const taskServer=express()

taskServer.use(cors())
taskServer.use(express.json())
taskServer.use(router)


const PORT=3000 || process.env.PORT

// to run port
taskServer.listen(PORT,()=>{
    console.log(`Server started at Port: ${PORT}`); 
})

taskServer.get('/',(req,res)=>{
    res.status(200).send('<h1 style="color:red;">Server is running!!</h1>')
})
