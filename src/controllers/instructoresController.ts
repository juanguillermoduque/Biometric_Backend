import {Request,Response} from 'express';
import db from '../database';

class InstructoresControllers{
    public async getRolesInstructor(req:Request,res:Response):Promise<any>{
        const instructores = await db.promise().query("SELECT usuario_roles.*,usuarios.* FROM usuario_roles INNER JOIN usuarios ON usuarios.num_id = usuario_roles.id_usuario WHERE usuario_roles.id_rol = 2 or usuario_roles.id_rol = 4  or usuario_roles.id_rol = 5");
        if(Object.keys(instructores).length > 0){
            return res.json((instructores[0]));
        }
    }
   
    public async createFichaInstructor(req:Request,res:Response):Promise<void>{
        try{
            await db.promise().query('INSERT INTO ficha_instructor SET ? ',[req.body]);
            res.json({
                message:"El instructor/a ha sido vinculado correctamente a la ficha"
            });
        }catch{
            return
        }
    }

    public async getInstructoresFichas(req:Request,res:Response):Promise<any>{
        const {fichaId} = req.params;
        const instructores = await db.promise().query("SELECT usuarios.first_name,usuarios.last_name,usuarios.num_id,usuarios.email FROM usuario_roles INNER JOIN usuarios ON usuario_roles.id_usuario = usuarios.num_id INNER JOIN ficha_instructor ON ficha_instructor.id_instructor = usuario_roles.id_usuario WHERE id_rol IN (2, 4, 5) AND ficha_instructor.id_ficha = ? ",[fichaId]);
        if(Object.keys(instructores).length > 0){
            return res.json((instructores[0]));
        }
    } 

    public async getFichasInstructores(req:Request,res:Response):Promise<any>{
        const {instructorId} = req.params;
        const fichas = await db.promise().query('SELECT fichas.*, programas.name_programa FROM fichas INNER JOIN programas ON fichas.id_programa = programas.id_programa INNER JOIN ficha_instructor ON ficha_instructor.id_ficha = fichas.code_ficha WHERE ficha_instructor.id_instructor = ?',[instructorId]);
    }   
}

const instructoresControllers = new InstructoresControllers();
export default instructoresControllers;