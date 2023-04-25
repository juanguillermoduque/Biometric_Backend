import {Request,Response} from 'express';
import db from '../database';

class ComponentesControllers{

    public async list(req:Request,res:Response):Promise<void>{
        const componentes = await db.promise().query('SELECT * FROM componentes');
        res.json(componentes);  
    } 
}

const componentesControllers = new ComponentesControllers();
export default componentesControllers;