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
const path = require('path');
class ExcusasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const excusa = yield database_1.default.promise().query('SELECT excusa.*,horario.* FROM excusa INNER JOIN horario ON excusa.id_horario = horario.id_horario');
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
            res.json({
                message: "excusa editada"
            });
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
                text: "excusa no existe"
            });
            console.log(excusa);
        });
    }
    uploadExcusa(req, res) {
        const storage = multer_1.default.diskStorage({
            filename: function (req, file, cb) {
                const ext = file.originalname.split('.').pop();
                const fileName = Date.now(); // Convert to string
                cb(null, `${fileName}.${ext}`); // Remove space between `${fileName}. ${ext}`
            },
            destination: function (req, file, cb) {
                cb(null, 'public'); // Adjust the destination path
            },
        });
        const upload = (0, multer_1.default)({ storage }).single('myFile'); // Use .single() here
        upload(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            if (!req.file) {
                return res.status(400).send("No se ha subido ningún archivo.");
            }
            let filePath = req.file.path;
            console.log(filePath);
            //await db.promise().query('INSERT INTO excusa (ruta_archivo) VALUES (?)',[filePath]);
            return res.json(filePath);
        }));
    }
    downloadPDF(req, res) {
        const filename = req.query.filename;
        const currentDirectory = __dirname;
        const publicDirectory = path.join(currentDirectory, '..', '..');
        const filePath = path.join(publicDirectory, filename);
        console.log(filePath);
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Error al descargar el archivo:', err);
                res.status(500).send('Error al descargar el archivo.');
            }
        });
    }
}
const excusasController = new ExcusasController();
exports.default = excusasController;
