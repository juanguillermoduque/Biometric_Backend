import {Request,Response} from 'express';
import db from '../database';

class InstructoresControllers{
    public async getRolesInstructor(req:Request,res:Response):Promise<any>{
        const instructores = await db.promise().query("SELECT usuario_roles.*,usuarios.* FROM usuario_roles INNER JOIN usuarios ON usuarios.num_id = usuario_roles.id_usuario WHERE usuario_roles.id_rol = 2");
        if(Object.keys(instructores).length > 0){
            return res.json((instructores[0]));
        }
    }
   
    public async createFichaInstructor(req:Request,res:Response):Promise<void>{
        await db.promise().query('INSERT INTO ficha_instructor SET ? ',[req.body]);
        res.json({
            message:"El instructor/a ha sido vinculado correctamente a la ficha"
        });
    }    
}

const instructoresControllers = new InstructoresControllers();
export default instructoresControllers;