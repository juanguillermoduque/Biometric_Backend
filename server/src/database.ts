import mysql from 'mysql2';
import keys from './keys';

const pool = mysql.createPool(keys.database);

pool.getConnection((err,conn)=>{
    console.log("conexion exitosa");

})
export default pool;