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
class RolesControllers {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.promise().query('INSERT INTO roles SET ?', [req.body]);
            res.json({
                message: "roles creados"
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.promise().query('UPDATE roles SET ? WHERE id_rol = ?', [req.body, id]);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            const roles = yield database_1.default.promise().query("SELECT * FROM roles WHERE nombre_rol = ?", [name]);
            if (Object.keys(roles).length > 0) {
                return res.json((roles[0])[0]);
            }
            res.status(404).json({
                text: "roles no exite"
            });
        });
    }
    create_componentes_roles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.promise().query('INSERT INTO componentes_roles SET ?', [req.body]);
            res.json({
                message: "roles creados"
            });
        });
    }
    update_componentes_roles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.promise().query('UPDATE componentes_roles SET ? WHERE id_rol = ?', [req.body, id]);
        });
    }
    getOne_componentes_roles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const roles = yield database_1.default.promise().query("SELECT * FROM componentes_roles WHERE id_rol = ?", [id]);
            if (Object.keys(roles).length > 0) {
                return res.json((roles[0])[0]);
            }
            res.status(404).json({
                text: "roles no exite"
            });
        });
    }
    listComponent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const componentes = yield database_1.default.promise().query('SELECT * FROM componentes');
            res.json(componentes);
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roles = yield database_1.default.promise().query('SELECT * FROM roles');
            res.json(roles);
        });
    }
}
const rolesControllers = new RolesControllers();
exports.default = rolesControllers;
