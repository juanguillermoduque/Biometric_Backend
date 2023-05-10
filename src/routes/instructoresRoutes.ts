import { Router } from 'express';
import validateToken from '../controllers/validateTokenController';
import instructoresControllers from '../controllers/instructoresController';

class InstructorRoutes{
   public router : Router = Router();
   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/instructor',validateToken,instructoresControllers.getRolesInstructor);
   }
}

const instructorRoutes = new InstructorRoutes();
export default instructorRoutes.router;
