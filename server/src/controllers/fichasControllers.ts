import {Request,Response} from 'express';
import db from '../database';

class FichasController{
    public async list(req:Request,res:Response):Promise<void>{
       const fichas = await db.query('SELECT * FROM fichas');
       res.json(fichas);
    } 

    public async create(req:Request,res:Response):Promise<void>{
        await db.query('INSERT INTO fichas SET ?',[req.body]);
        res.json({
            message:"Ficha creada"
        });
    }

    public async update(req:Request,res:Response):Promise<void>{
        const {id} = req.params;
        await db.query('UPDATE fichas SET ? WHERE idfichas = ?',[req.body,id]);
    }

    public async getOne(req:Request,res:Response):Promise<any>{
        const {id} = req.params;
        const ficha = await db.query("SELECT * FROM fichas WHERE idficha = ?",[id]);
        if(ficha.length > 0){
            return res.json(ficha[0]);
        }
        res.status(404).json({
            text: "Ficha no exite"
        });
    }
}

const fichasController = new FichasController();
export default fichasController;