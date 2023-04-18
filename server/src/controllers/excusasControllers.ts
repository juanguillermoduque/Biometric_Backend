import {Request,Response} from 'express';
import db from '../database';

class ExcusasController{
    public async list(req:Request,res:Response):Promise<void>{
       const excusa = await db.promise().query('SELECT * FROM excusa');
       res.json(excusa);
    } 

    public async create(req:Request,res:Response):Promise<void>{
        await db.promise().query('INSERT INTO excusa SET ?',[req.body]);
        res.json({
            message:"excusa creada"
        });
    }

    public async update(req:Request,res:Response):Promise<void>{
        const {id} = req.params;
        await db.promise().query('UPDATE excusa SET ? WHERE id_excusa = ?',[req.body,id]);
    }

    public async getOne(req:Request,res:Response):Promise<any>{
        const {id} = req.params;
        const excusa = await db.promise().query("SELECT * FROM excusa WHERE id_excusa = ?",[id]);
        if(Object.keys(excusa).length > 0){
            return res.json(excusa[0]);
        }
        res.status(404).json({
            text: "excusa no exite"
        });
        console.log(excusa);
    }
}

const excusasController = new ExcusasController();
export default excusasController;