import mysql from 'mysql2';
import keys from './keys';

const pool = mysql.createPool(keys.database);

pool.getConnection((err)=>{
    if(err){
        console.log("error de conexion")
    }else{
        console.log("conexion exitosa");
    }
});
export default pool;