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
class FiltrosBusqueda {
    searchFicha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const fichasId = yield database_1.default.promise().query("SELECT * FROM fichas INNER JOIN programas ON fichas.id_programa = programas.id_programa WHERE fichas.code_ficha like ? or fichas.code_ficha like ? or programas.name_programa like ? or fichas.estado like ?", [id + '%', '%' + id, id + '%', id + '%']);
            res.json(fichasId);
        });
    }
    searchUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { filtro } = req.params;
            const usuariosId = yield database_1.default.promise().query("SELECT * FROM usuarios WHERE num_id like ? or email like ? or first_name like ? or last_name like ? or estado like ?", [filtro + '%', filtro + '%', filtro + '%', filtro + '%', filtro + '%']);
            res.json(usuariosId);
        });
    }
    searchHorario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { filter } = req.params;
            const horarioId = yield database_1.default.promise().query("SELECT * FROM horario WHERE id_horario like ? ", [filter + '%']);
            console.log(filter);
            res.json(horarioId);
        });
    }
    searchAsistencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { filter } = req.params;
            const asistenciaId = yield database_1.default.promise().query("SELECT asistencias.*,horario.* FROM asistencias INNER JOIN horario ON asistencias.id_horario = horario.id_horario WHERE asistencias.id_aprendiz like ? ", [filter + '%']);
            res.json(asistenciaId);
        });
    }
    searchExcusa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { filter } = req.params;
            const excusaId = yield database_1.default.promise().query("SELECT * FROM asistencias WHERE id_asistencia like ? ", [filter + '%']);
            res.json(excusaId);
        });
    }
    searchRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { filter } = req.params;
            const excusaId = yield database_1.default.promise().query("SELECT * FROM roles WHERE id_rol like ? or nombre_rol like ?", [filter + '%', filter + '%']);
            res.json(excusaId);
        });
    }
}
const filtrosBusqueda = new FiltrosBusqueda();
exports.default = filtrosBusqueda;
