import {Request,Response} from 'express';
import db from '../database';

class FichasController{
    public async list(req:Request,res:Response):Promise<void>{
       const fichas = await db.promise().query('SELECT fichas.*, programas.name_programa FROM fichas INNER JOIN programas ON fichas.id_programa = programas.id_programa');
       res.json(fichas);
    } 

    public async create(req:Request,res:Response):Promise<void>{
        try{
            await db.promise().query("INSERT INTO fichas SET ?",[req.body]);
            console.log(req.body);
            res.json({
                message:"Ficha creada" 
            });
        }catch{
            res.status(404).json("La ficha ya existe")
        }
    } 

    public async update(req:Request,res:Response):Promise<void>{
        const {id} = req.params;
        await db.promise().query('UPDATE fichas SET ? WHERE code_ficha = ?',[req.body,id]);
        res.json({
            message:"Ficha editada" 
        });
    } 

    public async getOne(req:Request,res:Response):Promise<any>{
        const {id} = req.params;
        const ficha = await db.promise().query("SELECT fichas.*,programas.name_programa FROM fichas INNER JOIN programas ON fichas.id_programa = programas.id_programa WHERE code_ficha = ?",[id]);
        
        if( Object.keys(ficha).length > 0){
            return res.json((ficha[0])[0]);
        }
        res.status(404).json({
            text: "Ficha no existe"
        });
        console.log(ficha.body);
    }
}

const fichasController = new FichasController();
export default fichasController;