import {Request,Response,NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../constants';

const validateToken = (req:Request,res:Response,next:NextFunction)=>{
    const headerToken = req.headers['authorization'];

    if(headerToken != undefined){
        try {
            const bearerToken = headerToken.slice(7);
            jwt.verify(bearerToken,SECRET_KEY);
            next();
        } catch (e) {
            res.status(401).json({
                msg: "token no valido"
            }) 
        }
    }else{
        res.status(401).json({
            msg:'Acceso denegado' 
        }
        )
    }

}
export default validateToken;