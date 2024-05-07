import * as dotenv from "dotenv";
dotenv.config();
import { Client } from "pg";

const client = new Client({
  connectionString: process.env.DB,
});

client
  .connect()
  .then(() => console.log("connected to database"))
  .catch((error) => console.error(error));

async function createUserTable() {
  try {
    const result = await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Table created successfully:", result);
  } catch (error) {
    console.error("Error executing query:", error);
  }
}

async function insertData(username: string, email: string, password: string) {
  try {
    // Use parameterized query to prevent SQL injection
    const insertQuery =
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
    const values = [username, email, password];
    const res = await client.query(insertQuery, values);
    console.log("Insertion success:", res);
  } catch (err) {
    console.error("Error during the insertion:", err);
  }
}

// insertData('username5', 'user5@example.com', 'user_password').catch(console.error);

async function getUser(email: string) {
  try {
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      console.log("User found:", result.rows[0]); // Output user data
      return result.rows[0]; // Return the user data
    } else {
      console.log("No user found with the given email.");
      return null; // Return null if no user was found
    }
  } catch (err) {
    console.error("Error during fetching user:", err);
    throw err;
  }
}

getUser("user3@example.com").catch(console.error);
