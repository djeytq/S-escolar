const openDb = require("../model");
const hash = require('bcrypt').hashSync;
const { compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../auth');

class CrudSession {
    constructor() {
        // Inicialize qualquer estado necessário
    }

    async SignUp(req, res) {
        try {
            const id = req.body.id;
            const name = req.body.name;
            const cargo = req.body.cargo;
            const email = req.body.email;
            const password = req.body.password;
            const isActive = req.body.isActive;

            const passwordHash = hash(password, 10);

            const db = await openDb();
            let sql = `INSERT INTO administradores (name, cargo, email, password, isActive) VALUES (?, ?, ?, ?, ?)`;

            let stmt = await db.prepare(sql);
            await stmt.run([name, cargo, email, passwordHash, isActive]);
            await stmt.finalize();

            res.json({ message: 'Administrador cadastrado com sucesso!' });
        } catch (erro) {
            res.send(erro);
        }
    }

    async SignIn(req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            const db = await openDb();
            let sql = `SELECT * FROM administradores WHERE email = ?`;
            let stmt = await db.prepare(sql);
            let admin = await stmt.get(email);
            await stmt.finalize();

            if (admin && compareSync(password, admin.password)) {
                const token = jwt.sign({ id: admin.id, cargo: admin.cargo }, auth.secretKey, { expiresIn: auth.expiresIn });
                res.json({ message: 'Autenticação bem-sucedida!', token,admin });
            } else {
                res.status(401).json({ message: 'Credenciais inválidas!' });
            }
        } catch (erro) {
            res.send(erro);
        }
    }
}

module.exports = CrudSession;
