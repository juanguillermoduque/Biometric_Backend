"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const filtrosBusquedaController_1 = __importDefault(require("../controllers/filtrosBusquedaController"));
class FiltrosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/search:id', filtrosBusquedaController_1.default.search);
    }
}
const filtrosRoutes = new FiltrosRoutes();
exports.default = filtrosRoutes.router;
