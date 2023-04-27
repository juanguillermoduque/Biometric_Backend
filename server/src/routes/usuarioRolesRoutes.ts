import { Router } from 'express';
import usuariosRolesControllers from '../controllers/usuarioRolesControllers';

class UsuarioRolesRoutes{
   public router : Router = Router();
   constructor(){
    this.config();
   }

   config():void{
    this.router.post('/',usuariosRolesControllers.create);
   }
}

const usuarioRolesRoutes = new UsuarioRolesRoutes();
export default usuarioRolesRoutes.router;
