import {Request,Response} from 'express';
import db from '../database';

class UsuariosController{
    public async list(req:Request,res:Response):Promise<void>{
       const usuarios = await db.query('SELECT * FROM usuarios');
       res.json(usuarios);
    } 

    public async create(req:Request,res:Response):Promise<void>{
        await db.query('INSERT INTO usuarios SET ?',[req.body]);
        res.json({
            message:"usuarios creados"
        });
    }

    public async update(req:Request,res:Response):Promise<void>{
        const {id} = req.params;
        await db.query('UPDATE usuarios SET ? WHERE iduser = ?',[req.body,id]);
    }

    public async getOne(req:Request,res:Response):Promise<any>{
        const {id} = req.params;
        const usuarios = await db.query("SELECT * FROM usuarios WHERE iduser = ?",[id]);
        /*if(usuarios.length > 0){
            return res.json(usuarios[0]);
        }
        res.status(404).json({
            text: "usuario no exite"
        });*/
        console.log(usuarios);
    }
}

const usuariosController = new UsuariosController();
export default usuariosController;