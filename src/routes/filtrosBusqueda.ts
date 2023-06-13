import { Router } from 'express';
import filtrosBusqueda from '../controllers/filtrosBusquedaController';
import validateToken from '../controllers/validateTokenController';

class FiltrosRoutes{
   public router : Router = Router();
   
   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/searchFicha:id',validateToken,filtrosBusqueda.searchFicha);
    this.router.get('/searchUser:filtro',validateToken,filtrosBusqueda.searchUsuario);
    this.router.get('/searchHorario:filter',validateToken,filtrosBusqueda.searchHorario);
    this.router.get('/searchAsistencia:filter',validateToken,filtrosBusqueda.searchAsistencia);
    this.router.get('/searchExcusa:filter',validateToken,filtrosBusqueda.searchExcusa);
    this.router.get('/searchRol:filter',validateToken,filtrosBusqueda.searchRol);
   
   }

}

const filtrosRoutes = new FiltrosRoutes();
export default filtrosRoutes.router;
