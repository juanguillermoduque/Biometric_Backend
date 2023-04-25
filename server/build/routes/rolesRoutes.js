"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rolesControllers_1 = __importDefault(require("../controllers/rolesControllers"));
class RolesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', rolesControllers_1.default.list);
        this.router.post('/', rolesControllers_1.default.create);
        this.router.put('/editar:id', rolesControllers_1.default.update);
        this.router.get('/:name', rolesControllers_1.default.getOne);
        this.router.post('/componentes_roles', rolesControllers_1.default.create_componentes_roles);
        this.router.put('/componentes_roles/editar:id', rolesControllers_1.default.update_componentes_roles);
        this.router.get('/componentes_roles:id', rolesControllers_1.default.getOne_componentes_roles);
        this.router.get('/componentes', rolesControllers_1.default.listComponent);
    }
}
const rolesRoutes = new RolesRoutes();
exports.default = rolesRoutes.router;
