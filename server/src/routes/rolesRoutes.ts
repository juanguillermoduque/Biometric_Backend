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
    this.router.post('/componentes_roles',validateToken,rolesControllers.create_componentes_roles);
    this.router.put('/componentes_roles/editar:id',validateToken,rolesControllers.update_componentes_roles);
    this.router.get('/componentes_roles:id',validateToken,rolesControllers.getOne_componentes_roles);
    this.router.get('/componentes',validateToken,rolesControllers.listComponent);
   }
}

const rolesRoutes = new RolesRoutes();
export default rolesRoutes.router;
