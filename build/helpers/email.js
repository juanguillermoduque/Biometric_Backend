"use strict";
/*var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "53ddde7812fc14",
      pass: "01f67c23ce943f"
    }
  });*/
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
const nodemailer_1 = __importDefault(require("nodemailer"));
class Email {
    static get instance() {
        return this._instance || (this._instance = new Email());
    }
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "pruebasbiometricservice@gmail.com",
                pass: "ietabkthapjjmgba" //biometrics2465417  //ietabkthapjjmgba
            }
        });
    }
    //Verificar Email
    verificarEmail() {
        this.transporter.verify().then(() => {
            console.log('Listo para enviar email');
        });
    }
    //Pedir a qué correo vamos a enviar el email
    enviarEmail(email, passwordNew) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transporter.sendMail({
                from: '"Recuperación de contraseña"<53ddde7812fc14>',
                to: email,
                subject: 'Recuperación de contraseña',
                html: `<b>
            Su correo es: ${email} y su contraseña será ${passwordNew}, por favor, cambie su contraseña
            Da click al siguiente enlace: sssssssss
            </b>`
            });
        });
    }
}
exports.default = Email;
