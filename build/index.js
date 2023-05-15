"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//se importan dependencias y librerias de express
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
//Se importan los routers
const fichasRoutes_1 = __importDefault(require("./routes/fichasRoutes"));
const asistenciaRoutes_1 = __importDefault(require("./routes/asistenciaRoutes"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
const competenciaRoutes_1 = __importDefault(require("./routes/competenciaRoutes"));
const horarioRoutes_1 = __importDefault(require("./routes/horarioRoutes"));
const excusaRoutes_1 = __importDefault(require("./routes/excusaRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const rolesRoutes_1 = __importDefault(require("./routes/rolesRoutes"));
const componenteRoutes_1 = __importDefault(require("./routes/componenteRoutes"));
const filtrosBusqueda_1 = __importDefault(require("./routes/filtrosBusqueda"));
const usuarioRolesRoutes_1 = __importDefault(require("./routes/usuarioRolesRoutes"));

//se crea la clase server, la cual servira de main, para ejecutar la aplicación
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    //se definen los metodos que tendra la clase Server
    config() {
        //se define un valor para el atributo port
        this.app.set('port', 3000);
        //se declara el uso de las dependencias
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    //routes contiene todas las rutas a las que accedera el front
    routes() {
        this.app.use('/api/fichas', fichasRoutes_1.default);
        this.app.use('/api/usuarios', usuariosRoutes_1.default);
        this.app.use('/api/asistencias', asistenciaRoutes_1.default);
        this.app.use('/api/competencias', competenciaRoutes_1.default);
        this.app.use('/api/horarios', horarioRoutes_1.default);
        this.app.use('/api/excusas', excusaRoutes_1.default);
        this.app.use('/api/login', loginRoutes_1.default);
        this.app.use('/api/roles', rolesRoutes_1.default);
        this.app.use('/api/componentes', componenteRoutes_1.default);
        this.app.use('/api/filtros/', filtrosBusqueda_1.default);
        this.app.use('/api/usuario_rol', usuarioRolesRoutes_1.default);

    }
    start() {
        //se ejecuta el metodo listen, el cual es el encargado de poner a correr el servidor
        this.app.listen(this.app.get('port'), () => {
            console.log("Servidor en puerto", this.app.get('port'));
        });
    }
}
//se crea instancia de  la clase y se ejecuta servidor llamando al metodo start
const server = new Server();
server.start();
