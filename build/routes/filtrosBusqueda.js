"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const filtrosBusquedaController_1 = __importDefault(require("../controllers/filtrosBusquedaController"));
const validateTokenController_1 = __importDefault(require("../controllers/validateTokenController"));
class FiltrosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/searchFicha:id', validateTokenController_1.default, filtrosBusquedaController_1.default.searchFicha);
        this.router.get('/searchUser:filtro', validateTokenController_1.default, filtrosBusquedaController_1.default.searchUsuario);
        this.router.get('/searchHorario:filter', validateTokenController_1.default, filtrosBusquedaController_1.default.searchHorario);
        this.router.get('/searchAsistencia:filter', validateTokenController_1.default, filtrosBusquedaController_1.default.searchAsistencia);
        this.router.get('/searchExcusa:filter', validateTokenController_1.default, filtrosBusquedaController_1.default.searchExcusa);
        this.router.get('/searchRol:filter', validateTokenController_1.default, filtrosBusquedaController_1.default.searchRol);
    }
}
const filtrosRoutes = new FiltrosRoutes();
exports.default = filtrosRoutes.router;
