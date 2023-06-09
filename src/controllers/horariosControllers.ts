import {Request,Response} from 'express';
import db from '../database';

class HorariosController{ 
    public async list(req:Request,res:Response):Promise<void>{
       const horario = await db.promise().query('SELECT horario.*,fichas.*, usuarios.* FROM horario INNER JOIN fichas ON horario.id_ficha = fichas.id_ficha INNER JOIN usuarios ON horario.id_instructor = usuarios.num_id');
       res.json(horario);
    } 

    public async create(req:Request,res:Response):Promise<void>{
        await db.promise().query('INSERT INTO horario SET ?',[req.body]);
        res.json({
            message:"horario creado"
        });
    }

    public async update(req:Request,res:Response):Promise<void>{
        const {id} = req.params;
        await db.promise().query('UPDATE horario SET ? WHERE id_horario = ?',[req.body,id]);
        res.json({
            message:"horario editado"
        });
    }

    public async getOne(req:Request,res:Response):Promise<any>{
        const {id} = req.params;
        const horario = await db.promise().query("SELECT * FROM horario WHERE id_horario = ?",[id]);
        if(Object.keys(horario).length > 0){
            return res.json((horario[0])[0]);
        }
        res.status(404).json({
            text: "horario no existe"
        });
        console.log(horario);
    }
}

const horariosController = new HorariosController();
export default horariosController;