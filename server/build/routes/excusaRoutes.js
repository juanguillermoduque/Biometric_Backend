"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const excusasControllers_1 = __importDefault(require("../controllers/excusasControllers"));
class ExcusaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', excusasControllers_1.default.list);
        this.router.post('/', excusasControllers_1.default.create);
        this.router.put('/editar:id', excusasControllers_1.default.update);
        this.router.get('/:id', excusasControllers_1.default.getOne);
    }
}
const excusaRoutes = new ExcusaRoutes();
exports.default = excusaRoutes.router;
