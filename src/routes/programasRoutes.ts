import { Router } from 'express';
import programasController from '../controllers/programasControllers';
import validateToken from '../controllers/validateTokenController';

class ProgramasRoutes{
   public router : Router = Router();
   
   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/',validateToken,programasController.list);
    this.router.post('/',validateToken,programasController.create);
    this.router.put('/editar:id',validateToken,programasController.update);
    this.router.get('/:id',validateToken,programasController.getOne);
   }
}

const programasRoutes = new ProgramasRoutes();
export default programasRoutes.router;
 