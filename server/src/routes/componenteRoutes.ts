import { Router } from 'express';
import componentesControllers from '../controllers/componentesControllers';

class ComponenteRoutes{
   public router : Router = Router();
   
   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/',componentesControllers.list);

   }
}

const componenteRoutes = new ComponenteRoutes();
export default componenteRoutes.router;
