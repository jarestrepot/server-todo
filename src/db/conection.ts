import { Sequelize } from 'sequelize';

const db = process.env.MYSQL_ADDON_DB ?? 'todolistapp';
const root = process.env.MYSQL_ADDON_USER ?? 'root';
const password = process.env.MYSQL_ADDON_PASSWORD ?? 'aplicaciones';
const hotsBD = process.env.MYSQL_ADDON_HOST ?? 'localhost';
const portDB = process.env.MYSQL_ADDON_PORT ?? 3306


const sequelizeConnect = new Sequelize(db, root, password, {
  host: hotsBD,
  dialect: 'mysql',
  port: 3306
});

export default sequelizeConnect;

