"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const componentesControllers_1 = __importDefault(require("../controllers/componentesControllers"));
const validateTokenController_1 = __importDefault(require("../controllers/validateTokenController"));
class ComponenteRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.put('/componentes_roles/editar:id', validateTokenController_1.default, componentesControllers_1.default.update_componentes_roles);
        this.router.delete('/componentes_roles/delete:id', validateTokenController_1.default, componentesControllers_1.default.delete_componentes_roles);
        this.router.get('/', validateTokenController_1.default, componentesControllers_1.default.list);
        this.router.post('/componentes_roles', validateTokenController_1.default, componentesControllers_1.default.create_componentes_roles);
        this.router.get('/componentes_roles:id', validateTokenController_1.default, componentesControllers_1.default.getOne_componentes_roles);
        this.router.get('/:id', validateTokenController_1.default, componentesControllers_1.default.get_componentes);
    }
}
const componenteRoutes = new ComponenteRoutes();
exports.default = componenteRoutes.router;
