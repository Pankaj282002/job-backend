const pool = require('../db');
const bcrypt = require('bcryptjs');

const findByUsername = async (username) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
};

const createUser = async (username, password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const [result] = await pool.query('INSERT INTO users SET ?', { username, password: hashedPassword });
    return result;
};

module.exports = {
    findByUsername,
    createUser
};