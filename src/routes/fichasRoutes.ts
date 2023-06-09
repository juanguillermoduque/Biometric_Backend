import { Router } from 'express';
import fichasController from '../controllers/fichasControllers';
import validateToken from '../controllers/validateTokenController';

class FichasRoutes{
   public router : Router = Router();
   
   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/',validateToken,fichasController.list);
    this.router.post('/',validateToken,fichasController.create);
    this.router.put('/editar:id',validateToken,fichasController.update);
    this.router.get('/:id',validateToken,fichasController.getOne);
   }
}

const fichasRoutes = new FichasRoutes();
export default fichasRoutes.router;
 