import { Router } from 'express';
import componentesControllers from '../controllers/componentesControllers';
import validateToken from '../controllers/validateTokenController';

class ComponenteRoutes{
   public router : Router = Router();
   
   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/',validateToken,componentesControllers.list);

   }
}

const componenteRoutes = new ComponenteRoutes();
export default componenteRoutes.router;
