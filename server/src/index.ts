import express, {Application, urlencoded} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

import fichasRoutes from './routes/fichasRoutes';
import asistenciaRoutes from './routes/asistenciaRoutes';
import usuariosRoutes from './routes/usuariosRoutes';
import indexRoutes from './routes/indexRoutes';

class Server{

    public app: Application
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }
    config():void{
        this.app.set('port',process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({extended:false}))
        this.app.use(express.json());
        this.app.use(bodyParser.json())
        this.app.use(express,urlencoded({extended: false}));
    }
    routes(): void{
        this.app.use('/',indexRoutes);
        this.app.use('/api/fichas',fichasRoutes);
        this.app.use('/api/usuarios',usuariosRoutes);
        this.app.use('/api/asistencias',asistenciaRoutes);
    }
    start(): void{
        this.app.listen(this.app.get('port'),()=>{
            console.log("Servidor en puerto",this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();