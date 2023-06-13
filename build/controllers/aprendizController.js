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
class AprendizControllers {
    getRolesAprendices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const aprendices = yield database_1.default.promise().query("SELECT usuarios.first_name,usuarios.last_name,usuarios.num_id FROM usuario_roles INNER JOIN usuarios ON usuario_roles.id_usuario = usuarios.num_id WHERE id_rol = 3");
            if (Object.keys(aprendices).length > 0) {
                return res.json((aprendices[0]));
            }
        });
    }
}
const aprendizController = new AprendizControllers();
exports.default = aprendizController;
