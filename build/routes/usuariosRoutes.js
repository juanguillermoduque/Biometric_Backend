"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateTokenController_1 = __importDefault(require("../controllers/validateTokenController"));
const usuarioControllers_1 = __importDefault(require("../controllers/usuarioControllers"));
class UsuariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', validateTokenController_1.default, usuarioControllers_1.default.list);
        this.router.get('/recuperarcontrasena:id', usuarioControllers_1.default.recuperarPassword);
        this.router.post('/', validateTokenController_1.default, usuarioControllers_1.default.create);
        this.router.put('/editar:id', validateTokenController_1.default, usuarioControllers_1.default.update);
        this.router.get('/:id', validateTokenController_1.default, usuarioControllers_1.default.getOne);
        this.router.put('/:id/password', validateTokenController_1.default, usuarioControllers_1.default.updatePassword);
    }
}
const usuariosRoutes = new UsuariosRoutes();
exports.default = usuariosRoutes.router;
