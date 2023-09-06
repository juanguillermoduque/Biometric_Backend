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
    this.router.get('/instructor:fichaId',validateToken,instructoresControllers.getInstructoresFichas);
    this.router.get('/fichainstructor:instructorId',validateToken,instructoresControllers.getFichasInstructores);
    this.router.post('/fichainstructor',validateToken,instructoresControllers.createFichaInstructor);
   }
}

const instructorRoutes = new InstructorRoutes();
export default instructorRoutes.router;
