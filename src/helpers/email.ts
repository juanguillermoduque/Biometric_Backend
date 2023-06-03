/*var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "53ddde7812fc14",
      pass: "01f67c23ce943f"
    }
  });*/

import nodemailer from 'nodemailer';  
import SMTPTransport from 'nodemailer/lib/smtp-transport';
  
export default class Email { //se pone default ya que la clase va a ser lo único que se va a exportar del archivo
    
    //Atributos
    private static _instance: Email; //va a ser tipo Email, va a ser el mismo tipo de la clase
    private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>; //la variable es de tipo : "lo que hay después de :"

    public static get instance() {
        return this._instance || (this._instance = new Email());
    }

    constructor() { //en el constructor se va a inicializar la variable transporter 
        this.transporter = nodemailer.createTransport ({ //esto es para poder inicializar nuestro servidor y poder enviar emails a otros lugares
            host: "smtp.gmail.com", //solamente va a enviar correos a cuentas tipo gmail //(recordar @misena.edu.co) 
            port: 465, //465 por defecto en la documentación
            secure: true,
            auth: {
                user: "pruebasbiometricservice@gmail.com",
                pass: "ietabkthapjjmgba"  //biometrics2465417  //ietabkthapjjmgba
            }
        });
    }

    //Verificar Email
    public verificarEmail() { //probar si la conexión es correcta
        this.transporter.verify().then(() => { //es una promesa
            console.log('Listo para enviar email')
        }) 
    }

    //Pedir a qué correo vamos a enviar el email
    public async enviarEmail(email:string, passwordNew: string) {
        return await this.transporter.sendMail({ //es de tipo promesa, el await es para que pueda esperar a que responda esta función
            from: '"Recuperación de contraseña"<53ddde7812fc14>', //a quién se le va a enviar el correo
            to: email, //a quién se lo enviamos, se lo enviamos al email
            subject: 'Recuperación de contraseña', //asunto
            html: `<b>
            Su correo es: ${email} y su contraseña será ${passwordNew}, por favor, cambie su contraseña
            Da click al siguiente enlace: sssssssss
            </b>` 

        })
    }
}
  
  
  