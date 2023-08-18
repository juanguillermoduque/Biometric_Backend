import {Request,Response} from 'express';
import db from '../database';
import { generate } from 'generate-password';
import bycript from "bcrypt";
import Email from '../helpers/email';

class UsuariosController{
    public async list(req:Request,res:Response):Promise<void>{
       const usuarios = await db.promise().query('SELECT * FROM usuarios');
       res.json(usuarios);
    } 

    public async create(req:Request,res:Response):Promise<void>{
        try{
            let pass = req.body.password
            
            await db.promise().query('INSERT INTO usuarios SET ?',[req.body]);
            res.json({
                message:"usuarios creados"
            });
        }catch(e){
            console.error(e);
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
            text: "usuario no existe"
        });
        console.log(usuarios);
    }

    public async updatePassword(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { newPassword } = req.body;
        const { actualPassword } = req.body;

        const [updates] =  await db.promise().query('UPDATE usuarios SET password = ? WHERE num_id = ? AND password = ?', [newPassword, id,actualPassword]);
       
        if(updates.affectedRows > 0){
            res.json({
            message: 'Contraseña ya actualizada'
            });
        }else{
            res.json({
            message: 'Contraseña Incorrecta'
            });
        }
       

    }


    //RECUPERAR CONSTRASEÑA

    public async recuperarPassword(req: Request, res: Response) { //recibir información de tipo Request, dar una respuesta de tipo Response
        
        const {id} = req.params; //se van a recuperar del request body
        try{
            const existEmail = await db.promise().query("SELECT email FROM usuarios WHERE num_id=?",[id]);
            
            if(existEmail[0][0]){
                const email = existEmail[0][0].email;
                //recuperar - crear contraseña nueva 
                const passwordNew = generate({
                    length: 8, //de 8 caracteres
                    numbers: true,
                    uppercase: false
                });
                
                /*
                //cifrar la nueva contraseña
                const salt = bycript.genSaltSync(); //por defecto, va a generar 10 saltos
                //const iuser = bycript.hashSync(passwordNew, salt) //vamos a cifrar el password nuevo
                const iuser = bycript.hashSync(passwordNew, 1);
                */
                let pass = {
                    password : passwordNew
                }

                try{
                    const updatePassword  =  await db.promise().query('UPDATE usuarios SET ? WHERE num_id=?',[pass,id]);
                    //si se actualizó el correo correctamente, se le va a enviar un correo
                    Email.instance.enviarEmail(email, passwordNew);
                    //enviar un mensaje, un status 200
                    return res.status(200).json({
                        ok: true,
                        msg: `El correo ha sido enviado a ${email} satisfactoriamente`
                    });
                }catch(e){
                    console.error(e);
                    return res.status(400).json({
                        ok: false,
                        msg: `La contraseña no se pudo actualizar`
                    });
                }
            }
            return res.status(400).json({
                ok: false,
                msg: `Numero de documento incorrecto`
            })

        } catch (error) { //el catch es que el servidor no respondió, si hay un error arriba, nos va a enviar al catch
            console.log(error)
            return res.status(500).json({
                ok: true,
                msg: `Error en el funcionamiento del servidor`
            });
        }   
    }
    
    public async findAprendiz(){
        
    }
}

const usuariosController = new UsuariosController();
export default usuariosController;