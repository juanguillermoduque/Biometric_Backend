"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const horariosControllers_1 = __importDefault(require("../controllers/horariosControllers"));
class HorarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', horariosControllers_1.default.list);
        this.router.post('/', horariosControllers_1.default.create);
        this.router.put('/editar:id', horariosControllers_1.default.update);
        this.router.get('/:id', horariosControllers_1.default.getOne);
    }
}
const horarioRoutes = new HorarioRoutes();
exports.default = horarioRoutes.router;
