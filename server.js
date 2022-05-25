//importing express library to build webservers. 
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import {fileURLToPath} from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
console.log("filename is", __filename);
const __dirname = dirname(__filename);
console.log("directoryname is", __dirname);
const PORT = process.env.PORT || 3001

//importing routes 
import teaRoutes from './routes/teaRoutes.js';
import userRoutes from './routes/userRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

//import passport config 
import configurePassport from './passport-config.js';


dotenv.config();

//declare app which allows us to use the web app functionalities.
const app = express();
//allows use of cross origin resource sharing
app.use(cors({
    credentials:true,
    origin:true
}));

//allows us to send json information to the server (this is configuration)
app.use(express.json());
//allow us to read cookies sent with the request. 
app.use(cookieParser());


//initialize passport 
app.use(passport.initialize());
//configure passport using our function.
configurePassport(passport);

//connect to the database 
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`)
.then(() => {console.log("we are connected to the database.")})
.catch((error) => { console.log('an error occurred while connecting ot the db', error)})
//configure routes 
app.use('/api/teas', teaRoutes);
app.use('/api/users', userRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/orders', orderRoutes);

//statically serving the build folder
app.use(express.static(path.join(__dirname, "client/build")));
// * is the wildcard, anything else that's no matching a route above this.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

//listening for requests on port 3001
app.listen(PORT, ()=> {
    console.log("The server is listening for requests....");
})