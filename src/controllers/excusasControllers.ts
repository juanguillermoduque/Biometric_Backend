import {Request,Response} from 'express';
import db from '../database';
import multer, { FileFilterCallback, DiskStorageOptions } from 'multer';
const path = require('path');



class ExcusasController{
    public async list(req:Request,res:Response):Promise<void>{
       const excusa = await db.promise().query('SELECT excusa.*,horario.* FROM excusa INNER JOIN horario ON excusa.id_horario = horario.id_horario');
       res.json(excusa);
    } 

    public async listAprendiz(req:Request , res:Response):Promise<void>{
      const {id} = req.params; 
      const excusa = await db.promise().query('SELECT excusa.*,horario.* FROM excusa INNER JOIN horario ON excusa.id_horario = horario.id_horario where excusa.id_aprendiz = ?',[id]);
      res.json(excusa[0]);
    }

    public async create(req:Request,res:Response):Promise<void>{
        await db.promise().query('INSERT INTO excusa SET ?',[req.body]);
        res.json({
            message:"excusa creada"
        });
    }

    public async update(req:Request,res:Response):Promise<void>{
        const {id} = req.params;
        await db.promise().query('UPDATE excusa SET ? WHERE id_excusa = ?',[req.body,id]);
        res.json({
            message:"excusa editada"
        });
    }

    public async getOne(req:Request,res:Response):Promise<any>{
        const {id} = req.params;
        const excusa = await db.promise().query("SELECT * FROM excusa WHERE id_excusa = ?",[id]);
        if(Object.keys(excusa).length > 0){
            return res.json((excusa[0])[0]);
        }
        res.status(404).json({
            text: "excusa no existe"
        });
        console.log(excusa);
    }



  public uploadExcusa(req: Request, res: Response){
    const storage = multer.diskStorage({
      filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop();
        const fileName = Date.now(); // Convert to string
        cb(null, `${fileName}.${ext}`); // Remove space between `${fileName}. ${ext}`
      },
      destination: function (req, file, cb) {
        cb(null, 'public'); // Adjust the destination path
      },
    });

    const upload = multer({ storage }).single('myFile'); // Use .single() here
    

    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      if (!req.file) {
        return res.status(400).send("No se ha subido ningún archivo.");
      }

      let filePath = req.file.path;
      console.log(filePath)
      //await db.promise().query('INSERT INTO excusa (ruta_archivo) VALUES (?)',[filePath]);
      return res.json(filePath);
    
    });
  }

  public downloadPDF(req: Request, res: Response){

    const filename = req.query.filename;

    const currentDirectory = __dirname;
    const publicDirectory = path.join(currentDirectory, '..', '..');

    const filePath = path.join(publicDirectory, filename);
    console.log(filePath);

    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error al descargar el archivo:', err);
        res.status(500).send('Error al descargar el archivo.');
      }
    });
  }
}


const excusasController = new ExcusasController();
export default excusasController;