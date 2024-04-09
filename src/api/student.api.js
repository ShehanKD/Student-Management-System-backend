const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');


module.exports = function () {
    router.post('/create_student', studentController.postStudent);
    router.get('/get_student',studentController.getAllStudent);
    router.post('/post_admin',studentController.logAdmin);
    router.delete('/delete_student/:id', studentController.deleteRow) //params wala yawana ewwa yawanne mehemai 
    router.put('/update_student',studentController.updateRow);

    return router;
}