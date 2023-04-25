import { Router } from 'express';

import rolesControllers from '../controllers/rolesControllers';

class RolesRoutes{
   public router : Router = Router();
   
   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/',rolesControllers.list);
    this.router.post('/',rolesControllers.create);
    this.router.put('/editar:id',rolesControllers.update);
    this.router.get('/:name',rolesControllers.getOne);
    this.router.post('/componentes_roles',rolesControllers.create_componentes_roles);
    this.router.put('/componentes_roles/editar:id',rolesControllers.update_componentes_roles);
    this.router.get('/componentes_roles:id',rolesControllers.getOne_componentes_roles);
    this.router.get('/componentes',rolesControllers.listComponent);
   }
}

const rolesRoutes = new RolesRoutes();
export default rolesRoutes.router;
