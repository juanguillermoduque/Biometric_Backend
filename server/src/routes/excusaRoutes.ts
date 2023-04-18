import { Router } from 'express';
import excusasController from '../controllers/excusasControllers';


class ExcusaRoutes{
   public router : Router = Router();
   
   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/',excusasController.list);
    this.router.post('/',excusasController.create);
    this.router.put('/editar:id',excusasController.update);
    this.router.get('/:id',excusasController.getOne);
   }
}

const excusaRoutes = new ExcusaRoutes();
export default excusaRoutes.router;
