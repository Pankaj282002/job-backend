const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : process.env.DATABASE_URL,
    ssl: isProduction ? { rejectUnauthorized: false } : false
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to database!');
    release();
});

module.exports = pool;
