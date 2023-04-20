"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const jwt = __importStar(require("jsonwebtoken"));
class LoginController {
    auth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, pass } = req.body;
            const fichas = yield database_1.default.promise().query('SELECT email,rol FROM usuarios WHERE email=? and password=?', [email, pass]);
            if (Object.keys(fichas).length > 0) {
                const data = JSON.stringify(fichas[0]);
                const token = jwt.sign(data, 'Sena');
                res.json(token);
            }
            res.status(404).json({
                text: "USUARIO o clave Incorrectas"
            });
        });
    }
    verifyToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.headers.authorization)
                res.status(401).json('No Autorizado');
            else {
                const token = req.headers.authorization.substring(7);
                console.log(token);
                if (token !== '') {
                    var contenido = jwt.verify(token, 'Sena');
                    console.log(contenido);
                    //validaciones
                }
                else {
                    res.status(401).json('Token vacio');
                }
            }
        });
    }
}
const loginController = new LoginController();
exports.default = loginController;
