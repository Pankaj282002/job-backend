const pool = require('../db');

// Controller function to get all jobs
exports.getAllJobs = async (req, res) => {
    try {
        // Use the correct table name and initialize parameters
        let sql = 'SELECT * FROM jobs WHERE 1=1';
        const params = [];
        let paramIndex = 1;

        // Check for filters in the query
        const { job_role, location, type } = req.query;

        if (job_role) {
            sql += ` AND job_role LIKE $${paramIndex}`;
            params.push(`%${job_role}%`);
            paramIndex++;
        }

        if (location) {
            sql += ` AND location LIKE $${paramIndex}`;
            params.push(`%${location}%`);
            paramIndex++;
        }

        if (type) {
            sql += ` AND type = $${paramIndex}`;
            params.push(type);
            paramIndex++;
        }

        // Use pool.query and get rows from the result object
        const result = await pool.query(sql, params);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Controller function to get a single job
exports.getSingleJob = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM jobs WHERE job_id = $1', [id]);
        const rows = result.rows;
        
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
        // You'll need to update the Job.js model to use PostgreSQL syntax as well
        // For now, let's assume it works.
        const { company_name, job_role, location, qualification, experience_level, job_description, required_skills, batch, apply_link } = req.body;
        
        const sql = `
            INSERT INTO jobs (company_name, job_role, location, qualification, experience_level, job_description, required_skills, batch, apply_link)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING job_id;
        `;
        
        const params = [company_name, job_role, location, experience_level, job_description, required_skills, batch, apply_link];
        
        const result = await pool.query(sql, params);
        res.status(201).json({ msg: 'Job created successfully', job_id: result.rows[0].job_id });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Controller function to delete a job posting
exports.deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM jobs WHERE job_id = $1', [id]);
        const rows = result.rows;

        if (rows.length === 0) {
            return res.status(404).json({ msg: 'Job not found' });
        }
        
        res.status(200).json({ msg: 'Job deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
