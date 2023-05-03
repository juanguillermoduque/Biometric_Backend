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
    this.router.post('/componentes_roles',validateToken,componentesControllers.create_componentes_roles);
    this.router.put('/componentes_roles/editar:id',validateToken,componentesControllers.update_componentes_roles);
    this.router.get('/componentes_roles:id',validateToken,componentesControllers.getOne_componentes_roles);
    this.router.get('/:id',validateToken,componentesControllers.get_componentes);
   }
}

const componenteRoutes = new ComponenteRoutes();
export default componenteRoutes.router;
