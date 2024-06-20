/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Server} from 'http'
import mongoose from 'mongoose';
import config from './app/config';
import app from './app';


let server: Server;

async function main() {
    try {
        await mongoose.connect(config.database_url as string)
        server = app.listen(config.port,()=>{
            console.log(`Server is running or port ${config.port}`)
        })
    }
    catch(err){
        console.log(err)
    }
}

main()