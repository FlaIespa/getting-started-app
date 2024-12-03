const { Pool } = require('pg');

// Create a connection pool using the DATABASE_URL environment variable
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Initialize the database
async function init() {
    console.log("Initializing PostgreSQL database...");
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS todo_items (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            completed BOOLEAN NOT NULL DEFAULT false
        );
    `;
    await pool.query(createTableQuery);
}

// Fetch all items from the `todo_items` table
async function getItems() {
    const result = await pool.query('SELECT * FROM todo_items;');
    return result.rows;
}

// Other methods like teardown and query can also be defined here
async function teardown() {
    await pool.end();
}

module.exports = {
    init,
    getItems,
    teardown,
    query: (text, params) => pool.query(text, params),
};
