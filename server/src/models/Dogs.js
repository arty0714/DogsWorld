import { DataTypes } from 'sequelize';
import database from '../utils/database.js';

const Dogs = database.define('dogs', {
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	color: {
		type: DataTypes.STRING,
		allowNull: false
	},
	tail_length: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	weight: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
})

export default Dogs;