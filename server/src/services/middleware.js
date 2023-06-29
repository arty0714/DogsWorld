import { getDogs } from './dogServices.js'

//attributes list of dog entity
const dogFields = ['name', 'color', 'tail_length', 'weight']
//list of order possible values
const orderFields = ['ASC', 'DESC'];

//form an object from request query
//input: req.query = {}
//output: req.body.params = {}
export function proccessQuery(req, res, next) {
	const { query } = req;
	let result = {};

	if (hasKey(query, 'attribute')
		&& attributeExists(query.attribute)) {
		const key = query.attribute;
		const order = orderFields.indexOf(query.order) !== -1 ? query.order : 'ASC';

		result.order = [[ key, order ]];
	}

	if (hasKey(query, 'pageNumber')
		&& parseInt(query.pageNumber) !== 'NaN') {
		result.offset = parseInt(query.pageNumber);
	}

	if (hasKey(query, 'limit')
		&& parseInt(query.limit) !== 'NaN') {
		result.limit = parseInt(query.limit);
	}

	req.body.params = result;
	next();
}

//make sure that dog with user name does not exist
export async function checkIfDogExist(req, res, next) {
	const dog = req.body;
	let dogs = [];

	//find a dog with user name
	try {
		dogs = await getDogs({ where: { name: dog.name } });
	} catch(error) {
		res.status(401).json(error);

		return;
	}

	//if there exists such a dog send response
	if (dogs.length !== 0) {
		res.status(401).send('dog already exists');

		return;
	}

	next();
}

//check if name is not null
export function checkIfNameExist(req, res, next) {
	const dog = req.body;

	if (!dog.name) {
		res.status(401).send('dog has to have a name');

		return;
	}

	next();
}

export function modifyDogToValidDog(req, res, next) {
	let dog = req.body;

	//modify dog object to make sure 
	//all keys on dog exist on dogs entity
	dog = filterObject(dog, (key) => attributeExists(key));

	//fill undefined fields of dog with default values
	dog = fillEmptyFields(dog);

	req.body = dog;
	next();
}

//validate all dog attributes
//input: req.body = {...}
//output: req.body = {...}
export async function validateDogNumberAttributes(req, res, next) {
	const dog = req.body;

	//make sure tail length is number and is not negative
	if (!valueIsNumberAndNotNegative(dog.tail_length)) {
		res.status(401).send('dog cannot have such a tail');

		return;
	}

	//make sure weight is number and is not negative
	if (!valueIsNumberAndNotNegative(dog.weight)) {
		res.status(401).send('dog cannot have such a weight');

		return;
	}

	next();
}

export function validateStringAttributes(req, res, next) {
	const dog = req.body;

	if (!valueIsString(dog.name)) {
		res.status(401).send('name has to be a string');

		return;
	}

	if (!valueIsString(dog.color)) {
		res.status(401).send('color has to be a string');

		return;
	}

	next();
}

function valueIsString(value) {
	return typeof value === 'string';
}
//checks if value is number and is not negative
//input: primitive type variable
//output: boolean
function valueIsNumberAndNotNegative(value) {
	return typeof value === 'number' && value >= 0;
}

//checks if object has the key
//input: object, string
//output: boolean
function hasKey(obj, key) {
	const keys = Object.keys(obj);

	if (keys.indexOf(key) === -1) return false;

	return true;
}
//checks if dogs entity has the attribute
//input: string
//output: boolean
function attributeExists(attribute) {
	if (dogFields.indexOf(attribute) === -1) return false;

	return true;
}
//returns object with fields that meet callback conditions
//input: object, function: boolean
//output: object
function filterObject(obj, callback) {
	let result = {};
	const objKeys = Object.keys(obj);

	objKeys.forEach(key => {
		if (callback(key)) result[key] = obj[key];
	});

	return result;
}
//modifies object if some attributes are not defined
//fills them with default values
//input: object
//output: object
function fillEmptyFields(dog) {
	let result = {};
	const dogKeys = Object.keys(dog);
	const defaultFields = {
		color: 'red',
		tail_length: 11,
		weight: 30
	}

	dogFields.forEach(field => {
		//check if every dog attribute exist on input dog
		if (dogKeys.indexOf(field) !== -1) {
			result[field] = dog[field];

			return;
		}

		//if it doesn't fill it with default values
		result[field] = defaultFields[field];
	})

	return result;
}