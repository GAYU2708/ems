import mysql from "mysql";


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"employee_management"
});


export default db;