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

    public async vinulateAprendiz(req:Request,res:Response):Promise<void>{
        const aprendices = await db.promise().query("SELECT usuarios.first_name,usuarios.last_name,usuarios.num_id,usuarios.email FROM usuario_roles INNER JOIN usuarios ON usuario_roles.id_usuario = usuarios.num_id WHERE id_rol IN (3, 4) AND usuario_roles.id_usuario = ? ",[req.body.id_aprendiz]);
        if( Object.keys(aprendices[0]).length > 0){
            try{
                await db.promise().query('INSERT INTO ficha_aprendiz SET ? ',[req.body]);
                res.json({
                    message:"Aprendiz vinculado" ,
                    status:true
                });
            }catch{
                res.json({
                    message:"Aprendiz ya esta vinculado",
                    status:false
                }) 
            }
        }else{
            res.json({
                message:"No es un aprendiz" ,
                status:false
            });
        }

    } 
 
    public async desvincularAprendiz(req:Request,res:Response):Promise<void>{

        const [result] = await db.promise().query('DELETE FROM ficha_aprendiz WHERE id_ficha = ? and id_aprendiz = ? ',[req.body.id_ficha,req.body.id_aprendiz]);
        if (result.affectedRows > 0) {
            res.json({
                message: "Aprendiz Desvinculado",
                status: true
            });
        } else { 
            res.json({
                message: "El aprendiz no esta vinculado",
                status: false
            });
        }
    }

    public async vinulateInstructor(req:Request,res:Response):Promise<void>{
        const instructores = await db.promise().query("SELECT usuarios.first_name,usuarios.last_name,usuarios.num_id,usuarios.email FROM usuario_roles INNER JOIN usuarios ON usuario_roles.id_usuario = usuarios.num_id WHERE id_rol IN (2, 4, 5) AND usuario_roles.id_usuario = ? ",[req.body.id_instructor]);
        if( Object.keys(instructores[0]).length > 0){
            try{
                await db.promise().query('INSERT INTO ficha_instructor SET ? ',[req.body]);
                res.json({
                    message:"Instructor vinculado" ,
                    status:true
                });
            }catch{
                res.json({
                    message:"Instructor ya esta vinculado",
                    status:false
                }) 
            }
        }else{
            res.json({
                message:"No es un Instructor" ,
                status:false
            });
        }
    } 
 
    public async desvincularInstructor(req:Request,res:Response):Promise<void>{

        const [result] = await db.promise().query('DELETE FROM ficha_instructor WHERE id_ficha = ? and id_instructor = ? ',[req.body.id_ficha,req.body.id_instructor]);
        if (result.affectedRows > 0) {
            res.json({
                message: "instructor Desvinculado",
                status: true 
            });
        } else { 
            res.json({
                message: "El instructor no esta vinculado",
                status: false
            });
        }
    } 
}

const fichasController = new FichasController();
export default fichasController;