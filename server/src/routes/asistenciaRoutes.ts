import { Router } from 'express';
import asistenciaController from '../controllers/asistenciaControllers';


class AsistenciaRoutes{
   public router : Router = Router();
   
   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/',asistenciaController.list);
    this.router.post('/',asistenciaController.create);
    this.router.put('/editar:id',asistenciaController.update);
    this.router.get('/:id',asistenciaController.getOne);
   }
}

const asistenciaRoutes = new AsistenciaRoutes();
export default asistenciaRoutes.router;
