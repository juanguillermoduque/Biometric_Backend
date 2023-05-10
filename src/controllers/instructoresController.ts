import {Request,Response} from 'express';
import db from '../database';

class InstructoresControllers{
    public async getRolesInstructor(req:Request,res:Response):Promise<any>{
        const instructores = await db.promise().query("SELECT * FROM usuario_roles WHERE id_rol = 2");
        if(Object.keys(instructores).length > 0){
            return res.json((instructores[0])[0]);
        }
    }
}

const instructoresControllers = new InstructoresControllers();
export default instructoresControllers;