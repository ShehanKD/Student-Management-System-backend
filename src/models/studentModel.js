const {pool} = require ('../../config/dbConnect')
//here database connecting file is imported 

const createStudent = (data, res) => {
    const {name, email} = data; //Destructuring a variable 

    pool.getConnection((err, connection) => {
        if (err) {
          return res.json({ 
            error: true,
            message: err
           });
        } else {
            const sql = 'INSERT INTO student (Name, Email) VALUES (?,?)'; //this is the method used in mysql to insert data into a raw

            //This line executes the SQL query using the query method of the connection object. 
            //It takes three arguments: the SQL query string, an array of values to replace the placeholders in the query, and a callback function. 
           
            connection.query(sql, [name, email], (err, results) => { //this is used to pass data to the data connection
            connection.release();
            //This line releases the database connection back to the connection pool after the qu

            if (err) {
              return res.json({ 
                error: true,
                message: err
               });
            } else {
              return res.status(200).json({
                error:false,
                data:results,
                messsage:"Successfully Added!"
              });
            }
          });
        }
      });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getStudent = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject({ error: err });
      } else {
        const sql = 'SELECT * FROM student';
        connection.query(sql, (err, results) => {
          connection.release();
          if (err) {
            reject({ error: "Internal Server Error" });
          } else {
            resolve(results);
          }
        });
      } 
    });
  });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const adminLogin = (data, res) => {
  const { email, password } = data;

  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ 
        error: true,
        message: err
       });
    } else {
      const sql = 'SELECT * FROM admin WHERE email = ? AND password = ?';

      connection.query(sql, [email, password], (error, results) => {
        connection.release(); // Release the connection after query execution
        if (error) {
          return res.status(500).json({ 
            error: true,
            message: 'Database Error'
           });
        }
        if (results.length > 0) { //.length is used to find the length of an array
          return res.send({
            error: false,
            data: results,
            message: 'Admin Found'
        })
        } else {
          return res.send({
            error: true,
            message: 'Invalid email or password'
        })
        }
      });
    }
  });
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const deleteRecord = (id, res) =>{

  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ 
        error: true,
        message: 'Failed to connect to database'
         });
    }

    const sql = 'DELETE FROM student WHERE id = ?';

    connection.query(sql, [id], (error, results) => {
      connection.release(); // Release the connection after query execution
      if (error) {
        return res.status(500).json({  
        error: true,
        message: 'Database error'
      });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ 
        error:true,
        message:'Record not found' });
      }
      res.json({ 
        error:false,
      message:'Data successfuly deleted',
      data: results
      
    });
    });
  });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const updateRecord = (data, res) =>{
  const { id, name, email } = data;

  pool.getConnection((err, connection) =>{
    if (err) {
      return res.status(500).json({ 
        error: true,
        message: 'Failed to connect to database'
         });
    } else {
      const sql = 'UPDATE student SET Name = ?, Email = ?  WHERE ID = ?';

      connection.query(sql, [name, email, id] ,(error,results) =>{
        connection.release();
        if (error){
          return res.status(500).json({  
            error: true,
            message: 'Database error'
          });
        } 
        if (results.affectedRows === 0) {
          return res.status(404).json({ 
          error:true,
          message:'Record not found' });
        } else {
          return res.json({ 
          error:false,
          message:'Data Updated', 
          data: results});
        }
      })
    }

  })

}


module.exports = { createStudent,getStudent,adminLogin,deleteRecord, updateRecord }; 