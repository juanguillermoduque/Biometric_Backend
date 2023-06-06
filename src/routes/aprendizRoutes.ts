import { Router } from 'express';
import validateToken from '../controllers/validateTokenController';
import aprendizControllers from '../controllers/aprendizController';

class InstructorRoutes{
   public router : Router = Router();
   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/',validateToken,aprendizControllers.getRolesAprendices);
   }
}

const instructorRoutes = new InstructorRoutes();
export default instructorRoutes.router;
