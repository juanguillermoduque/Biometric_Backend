import {Request,Response} from 'express';
import db from '../database';

class UsuariosController{
    public async list(req:Request,res:Response):Promise<void>{
       const usuarios = await db.promise().query('SELECT * FROM usuarios');
       res.json(usuarios);
    } 

    public async create(req:Request,res:Response):Promise<void>{
        try{
            await db.promise().query('INSERT INTO usuarios SET ?',[req.body]);
            res.json({
                message:"usuarios creados"
            });
        }catch{
            
        }
    
    }

    public async update(req:Request,res:Response):Promise<void>{
        const {id} = req.params;
        await db.promise().query('UPDATE usuarios SET ? WHERE num_id = ?',[req.body,id]);
    }

    public async getOne(req:Request,res:Response):Promise<any>{
        const {id} = req.params;
        const usuarios = await db.promise().query("SELECT * FROM usuarios WHERE num_id = ?",[id]);
        if(Object.keys(usuarios).length > 0){
            return res.json((usuarios[0])[0]);
        }
        res.status(404).json({
            text: "usuario no exite"
        });
        console.log(usuarios);
    }

    public async updatePassword(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { password } = req.body;
        await db.promise().query('UPDATE usuarios SET password = ? WHERE num_id = ?', [password, id]);
        res.json({
          message: 'Contraseña ya actualizada'
        });
    }
    
}

const usuariosController = new UsuariosController();
export default usuariosController;