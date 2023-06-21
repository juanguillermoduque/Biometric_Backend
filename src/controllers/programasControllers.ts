import {Request,Response} from 'express';
import db from '../database';

class ProgramasController{
    public async list(req:Request,res:Response):Promise<void>{
       const programas = await db.promise().query('SELECT * FROM programas');
       res.json(programas[0]);
    } 

    public async create(req:Request,res:Response):Promise<void>{
        try{
            await db.promise().query("INSERT INTO programas SET ?",[req.body]);
            console.log(req.body);
            res.json({
                message:"Programa agregado" 
            });
        }catch{
            res.status(404).json("El programa ya existe")
        }
  
    } 

    public async update(req:Request,res:Response):Promise<void>{
        const {id} = req.params;
        await db.promise().query('UPDATE programas SET ? WHERE id_programa = ?',[req.body,id]);
    } 

    public async getOne(req:Request,res:Response):Promise<any>{
        const {id} = req.params;
        const programas = await db.promise().query("SELECT * FROM programas WHERE id_programa = ?",[id]);
        
        if( Object.keys(programas).length > 0){
            return res.json((programas[0])[0]);
        }
        res.status(404).json({
            text: "Programa no existe"
        });
        console.log(programas.body);
    }
}

const programasController = new ProgramasController();
export default programasController;