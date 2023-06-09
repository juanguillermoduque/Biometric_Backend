import {Request,Response} from 'express';
import db from '../database';

class UsuariosRolesControllers{

    public async create(req:Request,res:Response):Promise<void>{
        await db.promise().query('INSERT INTO usuario_roles SET ?', [req.body]);
        res.json({
            message: "Creado"
        });  
    }
    public async getOne(req:Request,res:Response):Promise<any>{
        const {id} = req.params;
        const usuarios_roles = await db.promise().query("SELECT * FROM usuario_roles WHERE id_usuario = ?",[id]);
        if(Object.keys(usuarios_roles).length > 0){
            return res.json((usuarios_roles[0])[0]);
        }
        res.status(404).json({
            text: "usuario no existe"
        });
        console.log(usuarios_roles);
    }
    public async getRolesInstructor(req:Request,res:Response):Promise<any>{
        const instructores = await db.promise().query("SELECT * FROM usuario_roles WHERE id_rol = 2");
        console.log(instructores);
        if(Object.keys(instructores).length > 0){
            return res.json((instructores[0]));
        }
    }
}

const usuariosRolesControllers = new UsuariosRolesControllers();
export default usuariosRolesControllers;