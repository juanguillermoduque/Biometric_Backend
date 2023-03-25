"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asistenciaControllers_1 = __importDefault(require("../controllers/asistenciaControllers"));
class AsistenciaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', asistenciaControllers_1.default.list);
        this.router.post('/', asistenciaControllers_1.default.create);
        this.router.put('/editar:id', asistenciaControllers_1.default.update);
        this.router.get('/:id', asistenciaControllers_1.default.getOne);
    }
}
const asistenciaRoutes = new AsistenciaRoutes();
exports.default = asistenciaRoutes.router;
