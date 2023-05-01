import { Router } from 'express';
import excusasController from '../controllers/excusasControllers';
import validateToken from '../controllers/validateTokenController';

class ExcusaRoutes{
   public router : Router = Router();
   
   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/',validateToken,excusasController.list);
    this.router.post('/',validateToken,excusasController.create);
    this.router.put('/editar:id',validateToken,excusasController.update);
    this.router.get('/:id',validateToken,excusasController.getOne);
   }
}

const excusaRoutes = new ExcusaRoutes();
export default excusaRoutes.router;
