import { Router } from 'express';

import usuariosController from '../controllers/usuarioControllers';


class UsuariosRoutes{
   public router : Router = Router();
   
   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/',usuariosController.list);
    this.router.post('/',usuariosController.create);
    this.router.put('/editar:id',usuariosController.update);
    this.router.get('/:id',usuariosController.getOne);
   }
}

const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;
