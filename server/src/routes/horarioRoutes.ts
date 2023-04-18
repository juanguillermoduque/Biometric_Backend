import { Router } from 'express';
import horariosController from '../controllers/horariosControllers';


class HorarioRoutes{
   public router : Router = Router();
   
   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/',horariosController.list);
    this.router.post('/',horariosController.create);
    this.router.put('/editar:id',horariosController.update);
    this.router.get('/:id',horariosController.getOne);
   }
}

const horarioRoutes = new HorarioRoutes();
export default horarioRoutes.router;
