
import {Request,Response} from 'express';
import db from '../database';
import * as jwt from 'jsonwebtoken';

class LoginController{

    public async auth(req:Request,res:Response):Promise<void>{
        const {email , pass } = req.body;
        const fichas =await db.promise().query('SELECT email,rol FROM usuarios WHERE email=? and password=?',[email,pass])
        if(Object.keys(fichas).length > 0){
            const data = JSON.stringify(fichas[0]);
            const token = jwt.sign(data,'Sena');
            res.json(token);
        }
        res.status(404).json({
            text: "USUARIO o clave Incorrectas"
        });
    }
    
    public async verifyToken(req:Request,res:Response):Promise<void>{
        if(!req.headers.authorization)res.status(401).json('No Autorizado');
        else{
            const token = req.headers.authorization.substring(7);
            console.log(token);
            if(token !== ''){
                var contenido = jwt.verify(token,'Sena');
                console.log(contenido);
                //validaciones
            } 
            else{  
                res.status(401).json('Token vacio');
            }
        }
    }
}

const loginController = new LoginController();
export default loginController;