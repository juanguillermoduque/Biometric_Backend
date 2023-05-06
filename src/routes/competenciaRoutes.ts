import { Router } from 'express';
import competenciasController from '../controllers/competenciasControllers';
import validateToken from '../controllers/validateTokenController';

class CompetenciaRoutes{
   public router : Router = Router();
   
   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/',validateToken,competenciasController.list);
    this.router.post('/',validateToken,competenciasController.create);
    this.router.put('/editar:id',validateToken,competenciasController.update);
    this.router.get('/:id',validateToken,competenciasController.getOne);
   }
}

const competenciaRoutes = new CompetenciaRoutes();
export default competenciaRoutes.router;
