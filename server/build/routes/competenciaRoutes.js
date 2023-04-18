"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const competenciasControllers_1 = __importDefault(require("../controllers/competenciasControllers"));
class CompetenciaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', competenciasControllers_1.default.list);
        this.router.post('/', competenciasControllers_1.default.create);
        this.router.put('/editar:id', competenciasControllers_1.default.update);
        this.router.get('/:id', competenciasControllers_1.default.getOne);
    }
}
const competenciaRoutes = new CompetenciaRoutes();
exports.default = competenciaRoutes.router;
