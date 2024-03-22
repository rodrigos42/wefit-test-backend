import Dotenv from "dotenv"
import { Sequelize } from "sequelize";

Dotenv.config({path: './.env'})

const dbHost = process.env.MYSQLDB_HOST || 'localhost'
const dbName: string = process.env.MYSQLDB_DATABASE || 'wefit';
const dbUser: string = process.env.MYSQLDB_USER || 'root';
const dbPassWord: string = process.env.MYSQLDB_PASSWORD || 'root';
const dbPort: number = parseInt(process.env.MYSQLDB_PORT || '3306', 10);

const dbConnection = new Sequelize(dbName, dbUser, dbPassWord, {
    host: dbHost,
    dialect: 'mysql',
    port: dbPort
})

export = dbConnection