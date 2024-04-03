const {pool} = require ('../../config/dbConnect')
//here database connecting file is imported 

const createStudent = (data, res) => {
    const {name, email} = data; //Destructuring a variable 

    pool.getConnection((err, connection) => {
        if (err) {
          return res.json({ error: err });
        } else {
            const sql = 'INSERT INTO student (Name, Email) VALUES (?,?)'; into //this is the method used in mysql to insert data into a raw

            //This line executes the SQL query using the query method of the connection object. 
            //It takes three arguments: the SQL query string, an array of values to replace the placeholders in the query, and a callback function. 
            connection.query(sql, [name, email], (err, results) => {
            connection.release();
            //This line releases the database connection back to the connection pool after the qu

            if (err) {
              return res.json({ error: "Internal Server Error" });
            } else {

              return res.status(200).send({
                data:results
              });
            }
          });
        }
      });
}
module.exports = { createStudent }; 