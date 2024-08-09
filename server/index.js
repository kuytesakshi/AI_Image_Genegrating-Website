import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleroutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes)

app.get('/', async (req,res)=>{
    res.send('hello, welcome to api!');
})
const port = process.env.PORT || 8080
const startServer =async () =>{
    try{
       connectDB(process.env.MONGODB_URL);
       app.listen(port, ()=>
        console.log('Server has stared on port http://localhost:${port}'))
    } catch(error){
       console.log(error);
    }
    
}
startServer();