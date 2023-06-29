import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('nodejs', 'SA', "mssql1Ipw", {
	host: 'mssql',
	dialect: 'mssql'
})

export default sequelize;