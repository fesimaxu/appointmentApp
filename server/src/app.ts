import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors"
import doctor from "./routes/DoctorRouter";
import user from "./routes/UserRouter"
import appointment from "./routes/AppointmentRouter"
dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/user', user);
app.use('/doctor', doctor);
app.use('/appointment', appointment);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || '', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions) 
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('MongoDB connection Error:', error);
  });



app.listen(process.env.PORT, () => {
    console.log(`This application is listening at ${process.env.PORT}`)
});




export default app;