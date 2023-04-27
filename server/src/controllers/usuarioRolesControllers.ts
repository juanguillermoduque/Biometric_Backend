import {Request,Response} from 'express';
import db from '../database';

class UsuariosRolesControllers{

    public async create(req:Request,res:Response):Promise<void>{
        await db.promise().query('INSERT INTO usuario_roles SET ?', [req.body]);
        res.json({
            message: "Creado"
        });  
    } 
}

const usuariosRolesControllers = new UsuariosRolesControllers();
export default usuariosRolesControllers;