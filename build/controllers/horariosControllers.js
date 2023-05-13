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
class HorariosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const horario = yield database_1.default.promise().query('SELECT * FROM horario');
            res.json(horario);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.promise().query('INSERT INTO horario SET ?', [req.body]);
            res.json({
                message: "horario creado"
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.promise().query('UPDATE horario SET ? WHERE id_horario = ?', [req.body, id]);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const horario = yield database_1.default.promise().query("SELECT * FROM horario WHERE id_horario = ?", [id]);
            if (Object.keys(horario).length > 0) {
                return res.json((horario[0])[0]);
            }
            res.status(404).json({
                text: "horario no existe"
            });
            console.log(horario);
        });
    }
}
const horariosController = new HorariosController();
exports.default = horariosController;
