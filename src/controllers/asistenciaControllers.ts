import {Request,Response} from 'express';
import db from '../database';

class AsistenciasController{
    public async list(req:Request,res:Response):Promise<void>{
       const asistencias = await db.promise().query('SELECT * FROM asistencias');
       res.json(asistencias);
    } 

    public async create(req:Request,res:Response):Promise<void>{
        await db.promise().query('INSERT INTO asistencias SET ?',[req.body]);
        res.json({
            message:"asistencia registrada"
        });
    }

    public async update(req:Request,res:Response):Promise<void>{
        const {id} = req.params;
        await db.promise().query('UPDATE asistencias SET ? WHERE id_asistencia = ?',[req.body,id]);
    } 

    public async getOne(req:Request,res:Response):Promise<any>{ 
        const {id} = req.params;
        const asistencias = await db.promise().query("SELECT * FROM asistencias WHERE id_asistencia = ?",[id]);
        if(Object.keys(asistencias).length > 0){
            return res.json((asistencias[0])[0]);
        }
        res.status(404).json({
            text: "asistencia no existe"
        }); 
        console.log(asistencias);
    }
}

const asistenciaController = new AsistenciasController();
export default asistenciaController;