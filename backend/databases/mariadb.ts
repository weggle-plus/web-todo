import dotenv from "dotenv";
import mariadb, { ConnectionOptions } from "mysql2";

dotenv.config();
const connectionOptions: ConnectionOptions = {
  host: "localhost",
  user: "root",
  password: process.env.MARIADB_PASSWORD,
  database: "todo",
  dateStrings: true,
};

export const connection = mariadb.createConnection(connectionOptions);
