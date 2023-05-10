"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateTokenController_1 = __importDefault(require("../controllers/validateTokenController"));
const instructoresController_1 = __importDefault(require("../controllers/instructoresController"));
class InstructorRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/instructor', validateTokenController_1.default, instructoresController_1.default.getRolesInstructor);
    }
}
const instructorRoutes = new InstructorRoutes();
exports.default = instructorRoutes.router;
