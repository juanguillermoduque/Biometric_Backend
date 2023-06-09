"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class InstructoresControllers {
    getRolesInstructor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const instructores = yield database_1.default.promise().query("SELECT usuario_roles.*,usuarios.* FROM usuario_roles INNER JOIN usuarios ON usuarios.num_id = usuario_roles.id_usuario WHERE usuario_roles.id_rol = 2");
            if (Object.keys(instructores).length > 0) {
                return res.json((instructores[0]));
            }
        });
    }
    createFichaInstructor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.promise().query('INSERT INTO ficha_instructor SET ? ', [req.body]);
            res.json({
                message: "El instructor/a ha sido vinculado correctamente a la ficha"
            });
        });
    }
}
const instructoresControllers = new InstructoresControllers();
exports.default = instructoresControllers;
