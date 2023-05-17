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
class ProgramasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const programas = yield database_1.default.promise().query('SELECT * FROM programas');
            res.json(programas);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.promise().query("INSERT INTO programas SET ?", [req.body]);
                console.log(req.body);
                res.json({
                    message: "Programa agregado"
                });
            }
            catch (_a) {
                res.status(404).json("El programa ya existe");
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.promise().query('UPDATE programas SET ? WHERE id_programa = ?', [req.body, id]);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const programas = yield database_1.default.promise().query("SELECT * FROM programas WHERE id_programa = ?", [id]);
            if (Object.keys(programas).length > 0) {
                return res.json((programas[0])[0]);
            }
            res.status(404).json({
                text: "Programa no existe"
            });
            console.log(programas.body);
        });
    }
}
const programasController = new ProgramasController();
exports.default = programasController;
