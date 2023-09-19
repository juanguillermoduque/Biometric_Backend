import {Request,Response} from 'express';
import db from '../database';

class HorariosController{ 
    public async list(req:Request,res:Response):Promise<void>{
       const horario = await db.promise().query('SELECT horario.*,fichas.*, usuarios.* FROM horario INNER JOIN fichas ON horario.id_ficha = fichas.code_ficha INNER JOIN usuarios ON horario.id_instructor = usuarios.num_id');
       console.log(horario[0])
       res.json(horario);
    } 

    public async create(req: Request, res: Response): Promise<void> {
        const horario = req.body.horario;
        const ficha_instructor = req.body.fichaInstructor;
    
        try {
            await db.promise().query('INSERT INTO horario SET ?', [horario]);
            await db.promise().query('INSERT INTO ficha_instructor SET ?', [ficha_instructor]);
            
        } catch (error) {
            console.error(error);
        }
        res.status(200).send({ message: 'Inserción exitosa' });
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