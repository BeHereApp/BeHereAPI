import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Promise from 'bluebird';

import routes from './api/routes/index.route';

const app = express();
const port = process.env.PORT || 3000;

// Configure mongo
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/behere_db', { useMongoClient: true });

// Logger
app.use(morgan('dev'));

// Use bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mount routes on /api path
app.use('/api', routes);

// Start server listener
app.listen(port);

console.log('listening on: ' + port)

export default app;
