const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolControllers.js');

router.post('/addSchool', schoolController.addSchool);
router.get('/listSchools', schoolController.listSchools);
router.delete('/deleteSchool/:id', schoolController.deleteSchool);

module.exports = router;
