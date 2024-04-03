const studentModel = require('../models/studentModel')

const postStudent = async (req, res) => {
    const { name, email} = req.body;
    const data = {
        name: name,
        email: email
    }

    try {
        await studentModel.createStudent(data, res);
    } catch (error) {
        return res.send({error: "Can't add to the database"})
    } 
}

module.exports = { postStudent };