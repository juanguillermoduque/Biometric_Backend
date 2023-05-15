import { Router } from 'express';
import validateToken from '../controllers/validateTokenController';
import instructoresControllers from '../controllers/instructoresController';

class InstructorRoutes{
   public router : Router = Router();
   constructor(){
    this.config();
   }

   config():void{
    this.router.post('') //get: ver en la base de datos, post: insertar en la base de datos
    this.router.get('/instructor',validateToken,instructoresControllers.getRolesInstructor);
    this.router.post('/fichainstructor',validateToken,instructoresControllers.createFichaInstructor);
   }
}

const instructorRoutes = new InstructorRoutes();
export default instructorRoutes.router;
