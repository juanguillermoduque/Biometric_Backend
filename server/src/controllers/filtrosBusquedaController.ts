import {Request,Response} from 'express';
import db from '../database';

class FiltrosBusqueda{

public async search(req:Request,res:Response):Promise<any>{
    const {id} = req.params;
    const fichasId = await db.promise().query("SELECT * FROM fichas WHERE code_ficha = ?",[id]);
    res.json(fichasId);
}
}

const filtrosBusqueda = new FiltrosBusqueda();
export default filtrosBusqueda;