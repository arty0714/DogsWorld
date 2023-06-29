import database from './utils/database.js'
import express from 'express';
import cors from 'cors';

import * as middleware from './services/middleware.js';
import * as dogControllers from './controllers/dogControllers.js';

database.sync()
	.then((result) => console.log('db is synched'))
	.catch((err) => console.log(err))

const app = express();

app.use(cors());
app.use(express.json());

app.get('/ping', (req, res, next) => {
	res.send('Dogshouseservice.Version1.0.1')
})
app.get('/dogs', middleware.proccessQuery, dogControllers.getDogs);

app.post('/dogs', middleware.modifyDogToValidDog, middleware. validateStringAttributes,  middleware.checkIfNameExist, middleware.checkIfDogExist, middleware.validateDogNumberAttributes, dogControllers.createDog)

app.listen(8080)