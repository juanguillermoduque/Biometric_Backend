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
        this.router.get('/', validateTokenController_1.default, componentesControllers_1.default.list);
    }
}
const componenteRoutes = new ComponenteRoutes();
exports.default = componenteRoutes.router;
