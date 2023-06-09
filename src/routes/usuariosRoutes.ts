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
    this.router.get('/recuperarcontrasena:id',usuariosController.recuperarPassword);
    this.router.post('/',validateToken,usuariosController.create);
    this.router.put('/editar:id',validateToken,usuariosController.update);
    this.router.get('/:id',validateToken,usuariosController.getOne);
    this.router.put('/:id/password',validateToken, usuariosController.updatePassword);
   }
}

const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;
