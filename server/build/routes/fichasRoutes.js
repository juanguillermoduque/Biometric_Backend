"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fichasControllers_1 = __importDefault(require("../controllers/fichasControllers"));
class FichasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', fichasControllers_1.default.list);
        this.router.post('/', fichasControllers_1.default.create);
        this.router.put('/editar:id', fichasControllers_1.default.update);
        this.router.get('/:id', fichasControllers_1.default.getOne);
    }
}
const fichasRoutes = new FichasRoutes();
exports.default = fichasRoutes.router;
