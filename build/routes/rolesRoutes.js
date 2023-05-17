"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateTokenController_1 = __importDefault(require("../controllers/validateTokenController"));
const rolesControllers_1 = __importDefault(require("../controllers/rolesControllers"));
class RolesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/rol:id', validateTokenController_1.default, rolesControllers_1.default.getOneId);
        this.router.get('/', validateTokenController_1.default, rolesControllers_1.default.list);
        this.router.post('/', validateTokenController_1.default, rolesControllers_1.default.create);
        this.router.put('/editar:id', validateTokenController_1.default, rolesControllers_1.default.update);
        this.router.get('/:name', validateTokenController_1.default, rolesControllers_1.default.getOne);
    }
}
const rolesRoutes = new RolesRoutes();
exports.default = rolesRoutes.router;
