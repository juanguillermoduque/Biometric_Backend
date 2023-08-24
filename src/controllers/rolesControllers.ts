import {Request,Response} from 'express';
import db from '../database';

class RolesControllers{

    public async getOne(req:Request,res:Response):Promise<any>{
        const {name} = req.params;
        const roles = await db.promise().query("SELECT * FROM roles WHERE nombre_rol = ?",[name]);
        if(Object.keys(roles).length > 0){
            return res.json((roles[0])[0]);
        }
        res.status(404).json({
            text: "roles no exite"
        });
    }

    public async getOneId(req:Request,res:Response):Promise<any>{
        const {id} = req.params;
        const rolesId = await db.promise().query("SELECT * FROM roles WHERE id_rol = ?",[id]);
        if(Object.keys(rolesId).length > 0){
            return res.json((rolesId[0])[0]);
        }
        res.status(404).json({
            text: "roles no exite"
        });
    }

    public async getOneByIdUser(req:Request,res:Response):Promise<any>{
        const {id} = req.params;
        const roles = await db.promise().query("SELECT roles.id_rol,roles.nombre_rol FROM roles INNER JOIN usuario_roles ON roles.id_rol = usuario_roles.id_rol WHERE id_usuario = ?",[id]);
        if(Object.keys(roles).length > 0){
            return res.json((roles[0])[0]);
        }
        res.status(404).json({
            text: "roles no exite"
        });
    }

    public async list(req:Request,res:Response):Promise<void>{
        const roles = await db.promise().query('SELECT * FROM roles');
        res.json(roles);
    } 

}

const rolesControllers = new RolesControllers();
export default rolesControllers;