import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const sequelize = new Sequelize(
  process.env.MYSQL_DB || "coverup",
  process.env.MYSQL_USER || "root",
  process.env.MYSQL_PASSWORD || "",
  {
    host: process.env.MYSQL_HOST || "localhost",
    dialect: "mysql",
    dialectModule: mysql2,
  }
);

// Ensure database connection and synchronization
(async () => {
  try {
    await sequelize.authenticate(); // Verifying the connection to the database
    console.log("Connected successfully to the database");
    // await sequelize.sync({ alter: true }); // Syncing the models with the database (making sure tables are updated)
    console.log("Models synchronized with the database.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export default sequelize;
