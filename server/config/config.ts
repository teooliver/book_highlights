import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_CONNECTION_URL = process.env.MONGO_CONNECTION_URL;

const config = {
  mongoConnectionUrl: MONGO_CONNECTION_URL,
  port: PORT,
};

export default config;
