//se importan libreria mysql y variables de conexion
import mysql from 'mysql2';
import keys from './keys';

//se crea el pool
const pool = mysql.createPool(keys.database);

//se ejecuta la conexion 
pool.getConnection((err)=>{
    if(err){
        console.log("error de conexion")
    }else{
        console.log("conexion exitosa");
    }
});

//se exporta el pool 
export default pool;