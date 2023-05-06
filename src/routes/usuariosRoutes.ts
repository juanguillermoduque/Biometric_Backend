import { Router } from 'express';
import validateToken from '../controllers/validateTokenController';
import usuariosController from '../controllers/usuarioControllers';


class UsuariosRoutes{
   public router : Router = Router();
   
   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/',validateToken,usuariosController.list);
    this.router.post('/',validateToken,usuariosController.create);
    this.router.put('/editar:id',validateToken,usuariosController.update);
    this.router.get('/:id',validateToken,usuariosController.getOne);
   }
}

const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;
