const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.SUPABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to database!');
    release();
});

module.exports = pool;
