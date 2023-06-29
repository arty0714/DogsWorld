import Dogs from '../models/Dogs.js';

export function getDogs(params) {
	return Dogs.findAll(params);
}
export function createDog(dog) {
	return Dogs.create(dog);
}