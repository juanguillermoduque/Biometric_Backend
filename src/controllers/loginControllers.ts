import { Request, Response } from 'express';
import db from '../database';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { SECRET_KEY } from '../constants';

class LoginController {
    public async auth(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            const passwordActualResult = await db.promise().query('SELECT password FROM usuarios WHERE email=?', [email]);
            if (passwordActualResult[0].length === 0) {
                res.status(401).json({ msg: 'Usuario o clave Incorrectas' });
                return;
            }
            
            const passwordActual = passwordActualResult[0][0].password.trim();
            const passwordProvided = password.trim();

            const passwordMatch = await bcrypt.compare(passwordProvided, passwordActual);

            if (passwordMatch) {
                const authResult = await db.promise().query('SELECT * FROM usuarios WHERE email=?', [email]);
                if (authResult[0].length === 0) {
                    res.status(401).json({ msg: 'Algo salió mal' });
                } else {
                    const data = authResult[0];
                    const token = jwt.sign({ data: data }, SECRET_KEY, {
                        expiresIn: '30m',
                    });
                    res.json(token);
                }
            } else {
                res.status(401).json({ msg: 'Usuario o clave Incorrectas' });
            }
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
}

const loginController = new LoginController();
export default loginController;
