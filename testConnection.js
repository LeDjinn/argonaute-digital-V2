require('dotenv').config({ path: '.env.local' }); // Load environment variables
const { Pool } = require('pg');

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Use the POSTGRES_URL from .env.local
});

// Test the database connection
async function testConnection() {
  try {
    console.log('Testing database connection...');
    const result = await pool.query('SELECT 1');
    console.log('Database connection successful!', result.rows);
    pool.end();
  } catch (error) {
    console.error('Database connection failed:', error);
    pool.end();
  }
}

testConnection();
