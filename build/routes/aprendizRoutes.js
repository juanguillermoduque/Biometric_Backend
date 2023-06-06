"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateTokenController_1 = __importDefault(require("../controllers/validateTokenController"));
const aprendizController_1 = __importDefault(require("../controllers/aprendizController"));
class InstructorRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', validateTokenController_1.default, aprendizController_1.default.getRolesAprendices);
    }
}
const instructorRoutes = new InstructorRoutes();
exports.default = instructorRoutes.router;
