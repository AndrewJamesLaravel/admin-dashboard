import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

/* DATA IMPORTS */
import User from './models/User.js';
import Product from './models/Product.js';
import ProductStat from './models/ProductStat.js';
import Transaction from './models/Transaction.js';
import OverallStat from './models/OverallStat.js';
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from './data/index.js';
import AffiliateStat from './models/AffiliateStat.js';

dotenv.config();

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(cors());

/* Routes */
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

/* Mongoose setup */
const conf = {
  port: process.env.PORT || 9000,
  mongoUrl: process.env.MONGO_URL
}

mongoose.set('strictQuery', false);
mongoose.connect(conf.mongoUrl)
.then(() => {
  app.listen(conf.port, () => console.log(`Server Port: ${conf.port}`));
  /* ONLY ADD DATA ONE TIME */
  /*AffiliateStat.insertMany(dataAffiliateStat);*/
  /*OverallStat.insertMany(dataOverallStat);*/
  /*Product.insertMany(dataProduct);*/
  /*ProductStat.insertMany(dataProductStat);*/
  /*Transaction.insertMany(dataTransaction);*/
  /*User.insertMany(dataUser);*/
})
  .catch((error) => console.error(`${error} did not connect`));
