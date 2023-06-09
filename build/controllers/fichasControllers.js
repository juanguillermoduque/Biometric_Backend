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
class FichasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fichas = yield database_1.default.promise().query('SELECT fichas.*, programas.name_programa FROM fichas INNER JOIN programas ON fichas.id_programa = programas.id_programa');
            res.json(fichas);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.promise().query("INSERT INTO fichas SET ?", [req.body]);
                console.log(req.body);
                res.json({
                    message: "Ficha creada"
                });
            }
            catch (_a) {
                res.status(404).json("La ficha ya existe");
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.promise().query('UPDATE fichas SET ? WHERE code_ficha = ?', [req.body, id]);
            res.json({
                message: "Ficha editada"
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const ficha = yield database_1.default.promise().query("SELECT fichas.*,programas.name_programa FROM fichas INNER JOIN programas ON fichas.id_programa = programas.id_programa WHERE code_ficha = ?", [id]);
            if (Object.keys(ficha).length > 0) {
                return res.json((ficha[0])[0]);
            }
            res.status(404).json({
                text: "Ficha no existe"
            });
            console.log(ficha.body);
        });
    }
}
const fichasController = new FichasController();
exports.default = fichasController;
