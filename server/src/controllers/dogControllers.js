import * as dogServices from '../services/dogServices.js';

export async function getDogs(req, res, next) {
	const { params } = req.body;
	let dogs = [];

	try {
		dogs = await dogServices.getDogs(params);
	} catch (error) {
		next(error);

		return;
	}

	res.status(200).json({ dogs });
}
export async function createDog(req, res, next) {
	const dog = req.body;

	try {
		await dogServices.createDog(dog);
	} catch(error) {
		next(error);

		return;
	}

	res.status(200).json(dog);
}