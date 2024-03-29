import { Router } from 'express';
import validateToken from '../controllers/validateTokenController';
import rolesControllers from '../controllers/rolesControllers';

class RolesRoutes{
   public router : Router = Router();
   
   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/rol:id',validateToken,rolesControllers.getOneId);
    this.router.get('/',validateToken,rolesControllers.list);
    this.router.get('/:name',validateToken,rolesControllers.getOne);
    this.router.get('/usuario/:id',rolesControllers.getOneByIdUser);
   }
} 

const rolesRoutes = new RolesRoutes();
export default rolesRoutes.router;
