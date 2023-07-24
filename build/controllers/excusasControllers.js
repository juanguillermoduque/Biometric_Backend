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
const multer_1 = __importDefault(require("multer"));
class ExcusasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const excusa = yield database_1.default.promise().query('SELECT * FROM excusa');
            res.json(excusa);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.promise().query('INSERT INTO excusa SET ?', [req.body]);
            res.json({
                message: "excusa creada"
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.promise().query('UPDATE excusa SET ? WHERE id_excusa = ?', [req.body, id]);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const excusa = yield database_1.default.promise().query("SELECT * FROM excusa WHERE id_excusa = ?", [id]);
            if (Object.keys(excusa).length > 0) {
                return res.json((excusa[0])[0]);
            }
            res.status(404).json({
                text: "excusa no exite"
            });
            console.log(excusa);
        });
    }
    uploadExcusa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = req.body;
            const storage = multer_1.default.diskStorage({
                filename: function (res, file, cb) {
                    const ext = file.originalname.split('.').pop();
                    const fileName = Date.now();
                    cb(null, `${fileName}. ${ext}`);
                },
                destination: function (res, file, cb) {
                    cb(null, `../../public`);
                }
            });
            const upload = (0, multer_1.default)({ storage });
            upload.single(file);
            res.send({ data: 'OK' });
        });
    }
}
const excusasController = new ExcusasController();
exports.default = excusasController;
