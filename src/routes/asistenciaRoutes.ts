import { Router } from 'express';
import asistenciaController from '../controllers/asistenciaControllers';
import validateToken from '../controllers/validateTokenController';

class AsistenciaRoutes{
   public router : Router = Router();
   
   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/',validateToken,asistenciaController.list);
    this.router.post('/',validateToken,asistenciaController.create);
    this.router.put('/editar:id',validateToken,asistenciaController.update);
    this.router.get('/:id',validateToken,asistenciaController.getOne);
   }
}

const asistenciaRoutes = new AsistenciaRoutes();
export default asistenciaRoutes.router;
