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
class AsistenciasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const asistencias = yield database_1.default.promise().query('SELECT asistencias.*,horario.* FROM asistencias INNER JOIN horario ON asistencias.id_horario = horario.id_horario');
            res.json(asistencias);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.promise().query('INSERT INTO asistencias SET ?', [req.body]);
                res.json("asistencia registrada");
            }
            catch (_a) {
                res.status(404).json({
                    mensaje: "La asistencia ya existe"
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.promise().query('UPDATE asistencias SET ? WHERE id_asistencia = ?', [req.body, id]);
            res.json("asistencia Editada");
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const asistencias = yield database_1.default.promise().query("SELECT * FROM asistencias WHERE id_asistencia = ?", [id]);
            if (Object.keys(asistencias).length > 0) {
                return res.json((asistencias[0])[0]);
            }
            res.status(404).json({
                text: "asistencia no existe"
            });
            console.log(asistencias);
        });
    }
}
const asistenciaController = new AsistenciasController();
exports.default = asistenciaController;
