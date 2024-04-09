const studentModel = require('../models/studentModel')

const postStudent = async (req, res) => {
    
    const { name, email} = req.body; //Extracting Data from Request Body
   
    const data = { //creates a data object containing the name and email extracted from the request body.
        name: name,
        email: email
    }

    try {
        await studentModel.createStudent(data, res);
    } catch (error) {
        return res.send({
            error: true,
            message: 'Internal server error'
        })
    } 
}

const getAllStudent  = async(req, res) =>{
    try {
        await studentModel.getStudent(res).then((result) => {
            if (result){
                return res.send({
                    error: false,
                    data: result,
                    message: 'Successfully retrieved the data'
                })
            }
        });
    } catch (error) {
        return res.send({
            error: true,
            message: 'Internal server error'
        })
    } 
}



const logAdmin = async (req, res) => {
    const { email, password} = req.body;
    const data = { //creates a data object containing the name and email extracted from the request body.
        email: email,
        password: password
    }
    try {
        await studentModel.adminLogin(data, res);
    } catch (error) {
        return res.send({error: "Internal server error"})
    } 
}


const deleteRow = async (req,res) => {
    const id = req.params.id;  //destructure wenne godak thibunoth. methana id eka withrak thiyena hinda thamai ehema wenne/ 

    // const {id} = req.params;
   
    try {
        await studentModel.deleteRecord(id, res);
    } catch (error) {
        return res.send({
            error:true,
            message: "Internal server error"
        })
    } 
}

const updateRow = async (req, res) => {
    const {name, email, id} = req.body;
    const data = { //creates a data object containing the name and email extracted from the request body.
        name: name,
        email: email,
        id: id
    }
    try {
        await studentModel.updateRecord(data, res);
    } catch (error) {
        return res.send({error: "Internal server error"})
    } 
}


module.exports = { postStudent,getAllStudent,logAdmin,deleteRow, updateRow };