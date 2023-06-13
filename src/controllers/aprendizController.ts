import {Request,Response} from 'express';
import db from '../database';

class AprendizControllers{
    public async getRolesAprendices(req:Request,res:Response):Promise<any>{
        const aprendices = await db.promise().query("SELECT usuarios.first_name,usuarios.last_name,usuarios.num_id FROM usuario_roles INNER JOIN usuarios ON usuario_roles.id_usuario = usuarios.num_id WHERE id_rol = 3");
        if(Object.keys(aprendices).length > 0){
            return res.json((aprendices[0]));
        }
    }    
}

const aprendizController = new AprendizControllers();
export default aprendizController;