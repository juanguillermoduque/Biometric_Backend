import { Router } from 'express';
import horariosController from '../controllers/horariosControllers';
import validateToken from '../controllers/validateTokenController';

class HorarioRoutes{
   public router : Router = Router();
   
   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/',validateToken,horariosController.list);
    this.router.post('/',validateToken,horariosController.create);
    this.router.put('/editar:id',validateToken,horariosController.update);
    this.router.get('/:id',validateToken,horariosController.getOne);
   }
}

const horarioRoutes = new HorarioRoutes();
export default horarioRoutes.router;
