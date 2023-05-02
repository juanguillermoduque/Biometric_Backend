
import {Request,Response} from 'express';
import db from '../database';
import * as jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../constants';

class LoginController{

    public async auth(req:Request,res:Response):Promise<void>{
        try{
            const {email , password } = req.body;
            const auth =await db.promise().query('SELECT email FROM usuarios WHERE email=? and password=?',[email,password])
            if(!auth){
                res.status(401).json("Algo salio mal");
            }          
            if(Object.keys((auth)[0]).length >0 ){

                const data = JSON.stringify(auth[0]);

                const token = jwt.sign({data:data},SECRET_KEY,{
                    expiresIn : 1800000
                });
                res.json(token);
            }else{
                res.status(404).json({
                    msg: "Usuario o clave Incorrectas"
                })
            }
        }catch(e){
            console.log(e);
            res.sendStatus(500);
        }

;
    }
    
}

const loginController = new LoginController();
export default loginController;