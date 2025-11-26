import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import serverConfig from './config/server.config.js'
import dbConfig from './config/db.config.js';
async function serverStart(){
    try{
        await mongoose.connect(dbConfig.MONGO_URI)
        console.log(`MongoDB connected`);

        const app = express();
        app.get('/',(req,res)=>{
            res.send("Hello World!");
        })

        app.listen(serverConfig.PORT,()=>{
            console.log(`Server is running on port : ${serverConfig.PORT}`)
        })
    }catch(error){
        console.error('Failed to start server: ', error.message)
    }
}

serverStart();