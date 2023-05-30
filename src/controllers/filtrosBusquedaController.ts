import {Request,Response} from 'express';
import db from '../database';

class FiltrosBusqueda{

public async searchFicha(req:Request,res:Response):Promise<any>{
    const {id} = req.params;
    const fichasId = await db.promise().query("SELECT * FROM fichas WHERE code_ficha like ? or code_ficha like ? or id_programa like ?",[id+'%','%' + id , id+'%']);
    res.json(fichasId);
} 

public async searchUsuario(req:Request,res:Response):Promise<any>{
    const {filtro} = req.params;
    const usuariosId = await db.promise().query("SELECT * FROM usuarios WHERE num_id like ? or email like ? or first_name like ? or last_name like ?",[filtro+'%','%' + filtro , filtro+'%' , '%' + filtro]);
    res.json(usuariosId);
}

public async searchHorario(req:Request,res:Response):Promise<any>{
    const {filter} = req.params;
    const horarioId = await db.promise().query("SELECT * FROM horario WHERE id_horario like ? ",[filter+'%']);
    res.json(horarioId);
}

public async searchAsistencia(req:Request,res:Response):Promise<any>{
    const {filter} = req.params;
    const asistenciaId = await db.promise().query("SELECT * FROM asistencias WHERE id_aprendiz like ? ",[filter+'%']);
    res.json(asistenciaId);
}

public async searchExcusa(req:Request,res:Response):Promise<any>{
    const {filter} = req.params;
    const excusaId = await db.promise().query("SELECT * FROM asistencias WHERE id_asistencia like ? ",[filter+'%']);
    res.json(excusaId);
}



}
 
const filtrosBusqueda = new FiltrosBusqueda();
export default filtrosBusqueda;