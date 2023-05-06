import { Router } from 'express';
import filtrosBusqueda from '../controllers/filtrosBusquedaController';
import validateToken from '../controllers/validateTokenController';

class FiltrosRoutes{
   public router : Router = Router();
   
   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/search:id',validateToken,filtrosBusqueda.search);

   }
}

const filtrosRoutes = new FiltrosRoutes();
export default filtrosRoutes.router;
