
import { Router } from 'express';
import loginController from '../controllers/loginControllers';

class LoginRoutes{
   public router : Router = Router();
   
   constructor(){
    this.config();
   }

   config():void{
    this.router.post('/',loginController.auth);
    this.router.post('/test',loginController.verifyToken);
   }


}

const loginRoutes = new LoginRoutes();
export default loginRoutes.router;
