import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

import userRouters from './routers/users';
import imageRouters from './routers/image';

const app = express();
const port = process.env.PORT || 3030;

const whitelist = [process.env.ALLOWED_CORS];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// Middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json());

// Injecting routes
app.use(userRouters);
app.use('/image', imageRouters);

app.get('/', (req, res) => {
  res.send('TS with Express! Hooowayyy!');
});

app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});
