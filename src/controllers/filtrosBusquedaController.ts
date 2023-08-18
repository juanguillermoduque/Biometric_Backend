import {Request,Response} from 'express';
import db from '../database';

class FiltrosBusqueda{

public async searchFicha(req:Request,res:Response):Promise<any>{
    const {id} = req.params;
    const fichasId = await db.promise().query("SELECT * FROM fichas INNER JOIN programas ON fichas.id_programa = programas.id_programa WHERE fichas.code_ficha like ? or fichas.code_ficha like ? or programas.name_programa like ? or fichas.estado like ?",[id+'%','%' + id , id+'%',id+'%']);
    res.json(fichasId);
} 

public async searchUsuario(req:Request,res:Response):Promise<any>{
    const {filtro} = req.params;
    const usuariosId = await db.promise().query("SELECT * FROM usuarios WHERE num_id like ? or email like ? or first_name like ? or last_name like ? or estado like ?",[filtro + '%', filtro + '%', filtro + '%' , filtro +'%' , filtro +'%']);
    res.json(usuariosId);
}

public async searchHorario(req:Request,res:Response):Promise<any>{
    const {filter} = req.params;
    const horarioId = await db.promise().query("SELECT * FROM horario WHERE id_horario like ? ",[filter+'%']);
    console.log(filter);
    res.json(horarioId);
}

public async searchAsistencia(req:Request,res:Response):Promise<any>{
    const {filter} = req.params;
    const asistenciaId = await db.promise().query("SELECT asistencias.*,horario.* FROM asistencias INNER JOIN horario ON asistencias.id_horario = horario.id_horario WHERE asistencias.id_aprendiz like ? ",[filter+'%']);
    res.json(asistenciaId);
}

public async searchExcusa(req:Request,res:Response):Promise<any>{
    const {filter} = req.params;
    const excusaId = await db.promise().query("SELECT excusa.*,horario.* FROM excusa INNER JOIN horario ON excusa.id_horario = horario.id_horario WHERE estado like ? ",[filter+'%']);
    res.json(excusaId);
}

public async searchRol(req:Request,res:Response):Promise<any>{
    const {filter} = req.params;
    const excusaId = await db.promise().query("SELECT * FROM roles WHERE id_rol like ? or nombre_rol like ?",[filter+'%',filter+'%']);
    res.json(excusaId);
}


}
 
const filtrosBusqueda = new FiltrosBusqueda();
export default filtrosBusqueda;