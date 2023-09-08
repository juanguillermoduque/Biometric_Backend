import { Router } from 'express';
import fichasController from '../controllers/fichasControllers';
import validateToken from '../controllers/validateTokenController';

class FichasRoutes{
   public router : Router = Router();
   
   constructor(){
    this.config();
   } 

   config():void{
    this.router.get('/',fichasController.list);
    this.router.post('/',validateToken,fichasController.create);
    this.router.put('/editar:id',validateToken,fichasController.update);
    this.router.get('/:id',validateToken,fichasController.getOne);
    this.router.post('/vincular/aprendiz',validateToken,fichasController.vinulateAprendiz);
    this.router.delete('/desvincular/aprendiz',validateToken,fichasController.desvincularAprendiz);
    this.router.post('/vincular/instructor',validateToken,fichasController.vinulateInstructor);
    this.router.delete('/desvincular/instructor',validateToken,fichasController.desvincularInstructor);
   }
}

const fichasRoutes = new FichasRoutes();
export default fichasRoutes.router;
 