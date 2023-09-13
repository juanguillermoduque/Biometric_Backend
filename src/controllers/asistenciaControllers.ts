import {Request,Response} from 'express';
import db from '../database';

class AsistenciasController{
    public async list(req:Request,res:Response):Promise<void>{
       const asistencias = await db.promise().query('SELECT asistencias.*,horario.* FROM asistencias INNER JOIN horario ON asistencias.id_horario = horario.id_horario');
       res.json(asistencias);
    }

    public async listAprendiz(req:Request,res:Response):Promise<void>{
        const {id} = req.params
        console.log(id)
        const asistencias = await db.promise().query('SELECT asistencias.*,horario.* FROM asistencias INNER JOIN horario ON asistencias.id_horario = horario.id_horario',[id]);
        console.log(asistencias)
        res.json(asistencias[0]);
    } 

    public async listInstructor(req:Request,res:Response):Promise<void>{
        const {id} = req.params
        const asistencias = await db.promise().query('SELECT asistencias.*,horario.* FROM asistencias INNER JOIN horario ON asistencias.id_horario = horario.id_horario WHERE horario.id_instructor = ?',[id]);
        res.json(asistencias[0]);
    } 

    public async create(req:Request,res:Response):Promise<void>{
        try{
            await db.promise().query('INSERT INTO asistencias SET ?',[req.body]);
            res.json("asistencia registrada");
        }catch{
            res.status(404).json({
                mensaje:"La asistencia ya existe"
            })
        }
    }

    public async update(req:Request,res:Response):Promise<void>{
        const {id} = req.params;
        await db.promise().query('UPDATE asistencias SET ? WHERE id_asistencia = ?',[req.body,id]);
        res.json("asistencia Editada");
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