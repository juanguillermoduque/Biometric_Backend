import {Request,Response} from 'express';
import db from '../database';

class CompetenciasController{
    public async list(req:Request,res:Response):Promise<void>{
       const competencias = await db.promise().query('SELECT * FROM competencias');
       res.json(competencias);
    } 

    public async create(req:Request,res:Response):Promise<void>{
        await db.promise().query('INSERT INTO competencias SET ?',[req.body]);
        res.json({
            message:"competencias creadas"
        });
    }

    public async update(req:Request,res:Response):Promise<void>{
        const {id} = req.params;
        await db.promise().query('UPDATE competencias SET ? WHERE id_competencia = ?',[req.body,id]);
    }

    public async getOne(req:Request,res:Response):Promise<any>{
        const {id} = req.params;
        const competencias = await db.promise().query("SELECT * FROM competencias WHERE id_competencia = ?",[id]);
        if(Object.keys(competencias).length > 0){
            return res.json(competencias[0]);
        }
        res.status(404).json({
            text: "competencia no exite"
        });
        console.log(competencias);
    }
}

const competenciasController = new CompetenciasController();
export default competenciasController;