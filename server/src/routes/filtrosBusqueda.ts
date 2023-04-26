import { Router } from 'express';
import filtrosBusqueda from '../controllers/filtrosBusquedaController';

class FiltrosRoutes{
   public router : Router = Router();
   
   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/search:id',filtrosBusqueda.search);

   }
}

const filtrosRoutes = new FiltrosRoutes();
export default filtrosRoutes.router;
