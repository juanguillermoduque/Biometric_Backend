"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioControllers_1 = __importDefault(require("../controllers/usuarioControllers"));
class UsuariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', usuarioControllers_1.default.list);
        this.router.post('/', usuarioControllers_1.default.create);
        this.router.put('/editar:id', usuarioControllers_1.default.update);
        this.router.get('/:id', usuarioControllers_1.default.getOne);
    }
}
const usuariosRoutes = new UsuariosRoutes();
exports.default = usuariosRoutes.router;
