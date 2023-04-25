import {Request,Response} from 'express';
import db from '../database';

class RolesControllers{

    public async create(req:Request,res:Response):Promise<void>{
        await db.promise().query('INSERT INTO roles SET ?',[req.body]);
        res.json({
            message:"roles creados"
        });
    }

    public async update(req:Request,res:Response):Promise<void>{
        const {id} = req.params;
        await db.promise().query('UPDATE roles SET ? WHERE id_rol = ?',[req.body,id]);
    }

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

    public async listComponent(req:Request,res:Response):Promise<void>{
        const componentes = await db.promise().query('SELECT * FROM componentes');
        res.json(componentes);  
    } 

    public async list(req:Request,res:Response):Promise<void>{
        const roles = await db.promise().query('SELECT * FROM roles');
        res.json(roles);
     } 
}

const rolesControllers = new RolesControllers();
export default rolesControllers;