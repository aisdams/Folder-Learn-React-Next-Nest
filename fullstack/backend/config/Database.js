import { Sequelize } from "sequelize";

const db = new Sequelize("data", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
