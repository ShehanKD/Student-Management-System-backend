const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

module.exports = function () {
    router.post('/create_student', studentController.postStudent);

    return router;
}