// load .env file contents into process .env by default
require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router=require('./Routes/routes')
require('./DB/Connection')

//creating server instance
const pfserver=express()

// config cors into server
pfserver.use(cors())

pfserver.use(express.json())

//config router ro server
pfserver.use(router)

//image to client side view
pfserver.use('/uploads',express.static('./uploads'))

const PORT=3000

//calling listen method to implement listen mode for server to run
pfserver.listen(PORT,()=>{
    console.log(`server is running at:${PORT}`);
})

// setting response for base_url get request
pfserver.get ('/',(req,res)=>{
    res.status(200).send("<h1> The get request hit successfully</h1>")
})