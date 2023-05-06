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
class UsuariosRolesControllers {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.promise().query('INSERT INTO usuario_roles SET ?', [req.body]);
            res.json({
                message: "Creado"
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuarios_roles = yield database_1.default.promise().query("SELECT * FROM usuario_roles WHERE id_usuario = ?", [id]);
            if (Object.keys(usuarios_roles).length > 0) {
                return res.json((usuarios_roles[0])[0]);
            }
            res.status(404).json({
                text: "usuario no existe"
            });
            console.log(usuarios_roles);
        });
    }
    getRolesInstructor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = 2;
            const instructores = yield database_1.default.promise().query("SELECT * FROM usuario_roles WHERE id_rol = 2");
            if (Object.keys(instructores).length > 0) {
                return res.json((instructores[0]));
            }
            res.status(404).json({
                text: "usuario no existe"
            });
            console.log(instructores);
        });
    }
}
const usuariosRolesControllers = new UsuariosRolesControllers();
exports.default = usuariosRolesControllers;
