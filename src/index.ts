//se importan dependencias y librerias de express
import express, {Application, urlencoded} from 'express';
import morgan from 'morgan';
import cors from 'cors';

//Se importan los routers
import fichasRoutes from './routes/fichasRoutes';
import asistenciaRoutes from './routes/asistenciaRoutes';
import usuariosRoutes from './routes/usuariosRoutes';
import competenciaRoutes from './routes/competenciaRoutes';
import horarioRoutes from './routes/horarioRoutes';
import excusaRoutes from './routes/excusaRoutes';
import loginRoutes from './routes/loginRoutes';
import rolesRoutes from './routes/rolesRoutes';
import componenteRoutes from './routes/componenteRoutes';
import filtrosBusqueda from './routes/filtrosBusqueda';
import usuarioRolesRoutes from './routes/usuarioRolesRoutes';
import programasRoutes from './routes/programasRoutes';
import instructoresRoutes from './routes/instructoresRoutes';
import usuariosController from './controllers/usuarioControllers'
 
//se crea la clase server, la cual servira de main, para ejecutar la aplicación
class Server{

    //se declara la variable app de tipo Application(atributo propio de express)
    public app: Application;
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    //se definen los metodos que tendra la clase Server
    config():void{

        //se define un valor para el atributo port
        this.app.set('port',3000);

        //se declara el uso de las dependencias
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }
 
    //routes contiene todas las rutas a las que accedera el front
    routes(): void{
        this.app.use('/api/fichas',fichasRoutes);
        this.app.use('/api/usuarios',usuariosRoutes);
        this.app.use('/api/asistencias',asistenciaRoutes);
        this.app.use('/api/competencias', competenciaRoutes)
        this.app.use('/api/horarios',horarioRoutes);
        this.app.use('/api/excusas',excusaRoutes);
        this.app.use('/api/login',loginRoutes);
        this.app.use('/api/roles',rolesRoutes);
        this.app.use('/api/componentes',componenteRoutes);
        this.app.use('/api/filtros/',filtrosBusqueda);
        this.app.use('/api/usuario_rol',usuarioRolesRoutes);
        this.app.use('/api/programas',programasRoutes);
        this.app.use('/api/instructor',instructoresRoutes);
        this.app.put('/api/usuarios/:id/password', usuariosController.updatePassword);
    }
    start(){
        //se ejecuta el metodo listen, el cual es el encargado de poner a correr el servidor
        this.app.listen(this.app.get('port'),()=>{
            console.log("Servidor en puerto",this.app.get('port'));
        });
    }
}

//se crea instancia de  la clase y se ejecuta servidor llamando al metodo start
const server = new Server();
server.start();


