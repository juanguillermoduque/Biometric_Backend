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
class UsuariosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield database_1.default.promise().query('SELECT * FROM usuarios');
            res.json(usuarios);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.promise().query('INSERT INTO usuarios SET ?', [req.body]);
            res.json({
                message: "usuarios creados"
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.promise().query('UPDATE usuarios SET ? WHERE num_id = ?', [req.body, id]);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuarios = yield database_1.default.promise().query("SELECT * FROM usuarios WHERE num_id = ?", [id]);
            if (Object.keys(usuarios).length > 0) {
                return res.json((usuarios[0])[0]);
            }
            res.status(404).json({
                text: "usuario no exite"
            });
            console.log(usuarios);
        });
    }
    updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { password } = req.body;
            yield database_1.default.promise().query('UPDATE usuarios SET password = ? WHERE num_id = ?', [password, id]);
            res.json({
                message: 'Contraseña ya actualizada'
            });
        });
    }
}
const usuariosController = new UsuariosController();
exports.default = usuariosController;
