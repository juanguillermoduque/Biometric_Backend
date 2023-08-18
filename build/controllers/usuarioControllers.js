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
const generate_password_1 = require("generate-password");
const email_1 = __importDefault(require("../helpers/email"));
class UsuariosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield database_1.default.promise().query('SELECT * FROM usuarios');
            res.json(usuarios);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.promise().query('INSERT INTO usuarios SET ?', [req.body]);
                res.json({
                    message: "usuarios creados"
                });
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.promise().query('UPDATE usuarios SET ? WHERE num_id = ?', [req.body, id]);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuarios = yield database_1.default.promise().query("SELECT * FROM usuarios WHERE num_id = ?", [id]);
            if (Object.keys(usuarios).length > 0) {
                return res.json((usuarios[0])[0]);
            }
            res.status(404).json({
                text: "usuario no exite"
            });
            console.log(usuarios);
        });
    }
    updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { password } = req.body;
            yield database_1.default.promise().query('UPDATE usuarios SET password = ? WHERE num_id = ?', [password, id]);
            res.json({
                message: 'Contraseña ya actualizada'
            });
        });
    }
    //RECUPERAR CONSTRASEÑA
    recuperarPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params; //se van a recuperar del request body
            try {
                const existEmail = yield database_1.default.promise().query("SELECT email FROM usuarios WHERE num_id=?", [id]);
                if (existEmail[0][0]) {
                    const email = existEmail[0][0].email;
                    //recuperar - crear contraseña nueva 
                    const passwordNew = (0, generate_password_1.generate)({
                        length: 8,
                        numbers: true,
                        uppercase: false
                    });
                    /*
                    //cifrar la nueva contraseña
                    const salt = bycript.genSaltSync(); //por defecto, va a generar 10 saltos
                    //const iuser = bycript.hashSync(passwordNew, salt) //vamos a cifrar el password nuevo
                    const iuser = bycript.hashSync(passwordNew, 1);
                    */
                    let pass = {
                        password: passwordNew
                    };
                    try {
                        const updatePassword = yield database_1.default.promise().query('UPDATE usuarios SET ? WHERE num_id=?', [pass, id]);
                        //si se actualizó el correo correctamente, se le va a enviar un correo
                        email_1.default.instance.enviarEmail(email, passwordNew);
                        //enviar un mensaje, un status 200
                        return res.status(200).json({
                            ok: true,
                            msg: `El correo ha sido enviado a ${email} satisfactoriamente`
                        });
                    }
                    catch (e) {
                        console.error(e);
                        return res.status(400).json({
                            ok: false,
                            msg: `La contraseña no se pudo actualizar`
                        });
                    }
                }
                return res.status(400).json({
                    ok: false,
                    msg: `Numero de documento incorrecto`
                });
            }
            catch (error) { //el catch es que el servidor no respondió, si hay un error arriba, nos va a enviar al catch
                console.log(error);
                return res.status(500).json({
                    ok: true,
                    msg: `Error en el funcionamiento del servidor`
                });
            }
        });
    }
    findAprendiz() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
const usuariosController = new UsuariosController();
exports.default = usuariosController;
