import express, { request, response } from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModels.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';


const app = express();

//middleware for parsing request body
app.use(express.json());

//middleware for handling CORS policy
// option 1 : allow all origin with default of cors(*)
//app.use(cors());
//option 2 : allow custom origin
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders:['Content-Type'],
//     })
// );

app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send('Anupam is a billionaire');
});

app.use('/books', booksRoute);
mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('Dude..! Connection is fine..!');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT} `);
        });
           
    })
    .catch((error)=>{
        console.log(error);
    });