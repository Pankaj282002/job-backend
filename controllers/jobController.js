const Job = require('../models/Job');
const pool = require('../db');

// Controller function to get all jobs
exports.getAllJobs = async (req, res) => {
    try {
        let sql = 'SELECT * FROM jobs WHERE 1=1';
        const params = [];

        // Check for filters in the query
        const { job_role, location, type } = req.query;

        if (job_role) {
            sql += ' AND job_role LIKE ?';
            params.push(`%${job_role}%`);
        }

        if (location) {
            sql += ' AND location LIKE ?';
            params.push(`%${location}%`);
        }

        if (type) {
            sql += ' AND type = ?';
            params.push(type);
        }

        const [rows] = await pool.query(sql, params);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Controller function to get a single job
exports.getSingleJob = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM jobs WHERE job_id = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ msg: 'Job not found' });
        }
        
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Controller function to post a new job
exports.postNewJob = async (req, res) => {
    try {
        await Job.createJob(req.body);
        res.status(201).json({ msg: 'Job created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};



// Controller function to delete a job posting
exports.deleteJob = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query('DELETE FROM jobs WHERE job_id = ?', [id]);

        res.status(200).json({ msg: 'Job deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};