import express from 'express';
import dotEnv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import apiRouter from "./router/apiRouter";

const app:express.Application = express();

// configure cors
app.use(cors());

// configure dotEnv
dotEnv.config({
    path : './.env'
});

// configure express to receive form data
app.use(express.json());

const hostname:string | undefined = process.env.HOST_NAME;
const port:number | undefined = Number(process.env.PORT);

// connect to MongoDB
let dbURL : string | undefined = process.env.MONGO_DB_LOCAL;
if(dbURL){
    mongoose.connect(dbURL, {
        useCreateIndex : true,
        useFindAndModify : false,
        useNewUrlParser : true,
        useUnifiedTopology : true
    }).then((response) => {
        console.log(`Connected to MongoDB Successfully....`);
    }).catch((error) => {
        console.error(error);
        process.exit(1); // stops node js process
    });
}

app.get('/', (request:express.Request , response:express.Response) => {
   response.status(200).send(`<h2>Welcome to BigBasket Server App</h2>`);
});

// configure router
app.use('/api', apiRouter);

if(port && hostname){
    app.listen(port, hostname , () => {
        console.log(`Express Server is Started at http://${hostname}:${port}`);
    });
}




