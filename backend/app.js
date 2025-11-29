
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import captainRouter from './routes/captain.routes.js';
import mapsRouter from './routes/maps.routes.js';
import rideRouter from './routes/ride.routes.js';

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('Uber Clone Backend is running');
});


app.use('/users', userRouter);
app.use('/captains', captainRouter);
app.use("/maps", mapsRouter);
app.use("/rides", rideRouter);


export default app;