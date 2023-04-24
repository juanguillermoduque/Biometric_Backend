import {Request,Response} from 'express';
import db from '../database';

class RolesControllers{
    public async list(req:Request,res:Response):Promise<void>{
       const roles = await db.promise().query('SELECT * FROM roles');
       res.json(roles);
    } 

    public async create(req:Request,res:Response):Promise<void>{
        await db.promise().query('INSERT INTO roles SET ?',[req.body]);
        res.json({
            message:"roles creados"
        });
    }

    public async update(req:Request,res:Response):Promise<void>{
        const {id} = req.params;
        await db.promise().query('UPDATE roles SET ? WHERE num_id = ?',[req.body,id]);
    }

    public async getOne(req:Request,res:Response):Promise<any>{
        const {id} = req.params;
        const roles = await db.promise().query("SELECT * FROM roles WHERE num_id = ?",[id]);
        if(Object.keys(roles).length > 0){
            return res.json((roles[0])[0]);
        }
        res.status(404).json({
            text: "roles no exite"
        });
    }

    public async create_componentes_roles(req:Request,res:Response):Promise<void>{
        await db.promise().query('INSERT INTO componentes_roles SET ?',[req.body]);
        res.json({
            message:"roles creados"
        });
    }

    public async update_componentes_roles(req:Request,res:Response):Promise<void>{
        const {id} = req.params;
        await db.promise().query('UPDATE componentes_roles SET ? WHERE id_rol = ?',[req.body,id]);
    }

    public async getOne_componentes_roles(req:Request,res:Response):Promise<any>{
        const {id} = req.params;
        const roles = await db.promise().query("SELECT * FROM componentes_roles WHERE id_rol = ?",[id]);
        if(Object.keys(roles).length > 0){
            return res.json((roles[0])[0]);
        }
        res.status(404).json({
            text: "roles no exite"
        });
    }
}

const rolesControllers = new RolesControllers();
export default rolesControllers;