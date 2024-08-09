import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleroutes.js';
import mongoose from 'mongoose';
dotenv.config();

const app = express();
app.use(cors(
    {
        origin: ["https://deploy-mern-lwhq.vercel-app"],
        methods:["POST","GET"],
        credentials:true
    }
));
app.use(express.json({limit: '50mb'}));
mongoose.connect('mongodb+srv://sakshi:sakshiky2003@cluster0.q4gzj.mongodb.net/?retryWrites=true&w=majority')
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes)

app.get('/', async (req,res)=>{
    res.send('hello');
})

const startServer =async () =>{
    try{
       connectDB(process.env.MONGODB_URL);
       app.listen(8080, ()=>
        console.log('Server has stared on port http://localhost:8080'))
    } catch(error){
       console.log(error);
    }
    
}
startServer();