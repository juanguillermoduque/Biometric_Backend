"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioRolesControllers_1 = __importDefault(require("../controllers/usuarioRolesControllers"));
const validateTokenController_1 = __importDefault(require("../controllers/validateTokenController"));
class UsuarioRolesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', validateTokenController_1.default, usuarioRolesControllers_1.default.create);
    }
}
const usuarioRolesRoutes = new UsuarioRolesRoutes();
exports.default = usuarioRolesRoutes.router;
