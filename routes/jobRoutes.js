const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const auth = require('../middleware/auth');

// @route   GET /api/jobs
// @desc    Get all job listings for the dashboard
router.get('/jobs', jobController.getAllJobs);

// @route   GET /api/jobs/:id
// @desc    Get a single job's details
router.get('/jobs/:id', jobController.getSingleJob);

// @route   POST /api/jobs
// @desc    Admin route to create a new job
router.post('/jobs', jobController.postNewJob);

// @route   POST /api/jobs
// @desc    Admin route to create a new job
router.post('/jobs', auth, jobController.postNewJob);



// @route   DELETE /api/jobs/:id
// @desc    Admin route to delete a job by its ID
router.delete('/:id', auth, jobController.deleteJob);

module.exports = router;