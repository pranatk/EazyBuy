// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Sequelize } = require("sequelize");
export default async function handler(req, res) {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: "postgres",
    }
  );
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  sequelize.close();

  res.status(200).json();
}
