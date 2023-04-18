import { Router } from 'express';
import competenciasController from '../controllers/competenciasControllers';


class CompetenciaRoutes{
   public router : Router = Router();
   
   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/',competenciasController.list);
    this.router.post('/',competenciasController.create);
    this.router.put('/editar:id',competenciasController.update);
    this.router.get('/:id',competenciasController.getOne);
   }
}

const competenciaRoutes = new CompetenciaRoutes();
export default competenciaRoutes.router;
