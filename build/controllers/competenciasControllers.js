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
class CompetenciasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const competencias = yield database_1.default.promise().query('SELECT * FROM competencias');
            res.json(competencias);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.promise().query('INSERT INTO competencias SET ?', [req.body]);
            res.json({
                message: "competencias creadas"
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.promise().query('UPDATE competencias SET ? WHERE id_competencia = ?', [req.body, id]);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const competencias = yield database_1.default.promise().query("SELECT * FROM competencias WHERE id_competencia = ?", [id]);
            if (Object.keys(competencias).length > 0) {
                return res.json((competencias[0])[0]);
            }
            res.status(404).json({
                text: "competencia no exite"
            });
            console.log(competencias);
        });
    }
}
const competenciasController = new CompetenciasController();
exports.default = competenciasController;
