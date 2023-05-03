import { Router } from 'express';
import validateToken from '../controllers/validateTokenController';
import rolesControllers from '../controllers/rolesControllers';

class RolesRoutes{
   public router : Router = Router();
   
   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/',validateToken,rolesControllers.list);
    this.router.post('/',validateToken,rolesControllers.create);
    this.router.put('/editar:id',validateToken,rolesControllers.update);
    this.router.get('/:name',validateToken,rolesControllers.getOne);
    this.router.get('/id:id',validateToken,rolesControllers.getOneId);
   }
} 

const rolesRoutes = new RolesRoutes();
export default rolesRoutes.router;
