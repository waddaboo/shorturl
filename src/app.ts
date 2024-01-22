import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { errorHandler } from './utils/errorHandler.util';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const compression = require('compression');
const cors = require('cors');
const express = require('express');
const useragent = require('express-useragent');

const api = require('./routes');

const app = express();

app.set('trust proxy', true);
app.use(compression());
app.use(cors());
app.use(cors({ origin: '*' }));
app.use(useragent.express());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', 'false');
  next();
});

// X-Content-Type-Options
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

// X-Frame-Options
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
});

// CSP
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// append /api/{version} for http request
app.use(api.default);

app.use(errorHandler);

export default app;
