import { Router } from 'express';
import usuariosRolesControllers from '../controllers/usuarioRolesControllers';
import validateToken from '../controllers/validateTokenController';

class UsuarioRolesRoutes{
   public router : Router = Router();
   constructor(){
    this.config();
   }

   config():void{
    this.router.post('/',validateToken,usuariosRolesControllers.create);
    this.router.get('/:id',validateToken,usuariosRolesControllers.getOne);
   }
}

const usuarioRolesRoutes = new UsuarioRolesRoutes();
export default usuarioRolesRoutes.router;
