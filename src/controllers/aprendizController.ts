import {Request,Response} from 'express';
import db from '../database';

class AprendizControllers{
    public async getRolesAprendices(req:Request,res:Response):Promise<any>{
        const aprendices = await db.promise().query("SELECT usuarios.first_name,usuarios.last_name,usuarios.num_id,usuarios.email FROM usuario_roles INNER JOIN usuarios ON usuario_roles.id_usuario = usuarios.num_id WHERE id_rol = 3 or id_rol = 4");
        if(Object.keys(aprendices).length > 0){
            return res.json((aprendices[0]));
        }
    } 
    
    public async getAprendicesFichas(req:Request,res:Response):Promise<any>{
        const {fichaId} = req.params;
        const aprendices = await db.promise().query("SELECT usuarios.first_name,usuarios.last_name,usuarios.num_id,usuarios.email FROM usuario_roles INNER JOIN usuarios ON usuario_roles.id_usuario = usuarios.num_id INNER JOIN ficha_aprendiz ON ficha_aprendiz.id_aprendiz = usuario_roles.id_usuario WHERE id_rol IN (3, 4) AND ficha_aprendiz.id_ficha = ? ",[fichaId]);
        if(Object.keys(aprendices).length > 0){
            return res.json((aprendices[0]));
        }
    }  
}

const aprendizController = new AprendizControllers(); 
export default aprendizController;