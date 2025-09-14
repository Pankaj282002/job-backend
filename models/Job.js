
const pool = require('../db');

// Function to get all jobs
const getJobs = async () => {
    const [rows] = await pool.query('SELECT job_id, company_name, job_role, location, qualification FROM jobs');
    return rows;
};

// Function to get a single job by its ID
const getJobById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM jobs WHERE job_id = ?', [id]);
    return rows[0];
};

// Function to create a new job posting
const createJob = async (newJob) => {
    const [result] = await pool.query('INSERT INTO jobs SET ?', [newJob]);
    return result;
};

module.exports = {
    getJobs,
    getJobById,
    createJob
};