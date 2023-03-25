import { Router } from 'express';
import fichasController from '../controllers/fichasControllers';


class FichasRoutes{
   public router : Router = Router();
   
   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/',fichasController.list);
    this.router.post('/',fichasController.create);
    this.router.put('/editar:id',fichasController.update);
    this.router.get('/:id',fichasController.getOne);
   }
}

const fichasRoutes = new FichasRoutes();
export default fichasRoutes.router;
