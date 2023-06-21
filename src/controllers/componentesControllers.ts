import {Request,Response} from 'express';
import db from '../database';

class ComponentesControllers{

    public async list(req:Request,res:Response):Promise<void>{
        const componentes = await db.promise().query('SELECT * FROM componentes');
        res.json(componentes);  
    }

    public async get_componentes(req:Request,res:Response):Promise<any>{
        const {id} = req.params;
        const componente = await db.promise().query('SELECT * FROM componentes WHERE id_componente = ?',[id]);
        if(Object.keys(componente).length > 0){

            return res.json((componente[0]));
        }
        res.status(404).json({
            text: "componentes no exite"
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
        const roles = await db.promise().query('SELECT * FROM componentes_roles WHERE id_rol = ?',[id]);
        if(Object.keys(roles).length > 0){

            return res.json((roles[0]));
        }
        res.status(404).json({
            text: "roles no exite"
        });
    }

    public async getComponentesByRol(req:Request,res:Response):Promise<any>{
        console.log("entre");
        const {id} = req.params;
        const roles = await db.promise().query('SELECT componentes.* , roles.* FROM componentes_roles INNER JOIN componentes, roles ON componentes_roles.id_rol = roles.id_rol ON componentes_roles.id_componente = componentes.id_componente  WHERE componentes_roles.id_rol = ?',[id]);
        console.log(roles);
        res.json(roles);
    }

    public async delete_componentes_roles(req:Request,res:Response):Promise<any>{
        const {id} = req.params;
        await db.promise().query('DELETE FROM componentes_roles WHERE id_rol = ?',[id])
    }


}

const componentesControllers = new ComponentesControllers();
export default componentesControllers;