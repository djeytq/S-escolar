const openDb = require("../model");

class CrudAlunos {
    constructor() {
        // Inicialize qualquer estado necessário
    }

    async createAluno(req, res) {
        try {
            const { name, email } = req.body;
            const file = req.file;

            if (file) {


                res.json({ message: 'Aluno cadastrado com sucesso!' });
            }
            else {
                res.json({ message: 'Aluno cadastrado com sucesso!, sem foto.' });
                const db = await openDb();
                let sql = `INSERT INTO alunos (name, email) VALUES (?, ?)`;
                let stmt = await db.prepare(sql);
                await stmt.run([name, email]);
                await stmt.finalize();
                await db.close();
                //Waiting for the implementation of the file upload
            }
        } catch (erro) {
            res.send(erro);
        }
    }

    async readAluno(req, res) {
        try {
            const id = req.body.id;

            const db = await openDb();
            if (id) {
                let sql = `SELECT * FROM alunos WHERE id = ?`;
                let stmt = await db.prepare(sql);
                let aluno = await stmt.get(id);
                await stmt.finalize();
                res.json(aluno);
            } else {
                let sql = `SELECT * FROM alunos`;
                let alunos = await db.all(sql);
                await db.close();
                res.json(alunos);
            }

        } catch (erro) {
            res.send(erro);
        }
    }

    async updateAluno(req, res) {
        try {
            const { id, name, email } = req.body;

            const file = req.file;

            if (file) {

                //waiting for the implementation of the file upload
            } else {

                const db = await openDb();
                let sql = `UPDATE alunos SET name = ?, email = ?, updated_at=datetime("now") WHERE id = ?`;
                let stmt = await db.prepare(sql);
                await stmt.run([name, email, id]);
                await stmt.finalize();
                await db.close();

                res.json({ message: 'Aluno atualizado com sucesso!' });
            }

        } catch (erro) {
            res.send(erro);
        }
    }

    async deleteAluno(req, res) {
        try {
            const id = req.body.id;

            const db = await openDb();
            let sql = `DELETE FROM alunos WHERE id = ?`;
            let stmt = await db.prepare(sql);
            await stmt.run(id);
            await stmt.finalize();
            await db.close();

            res.json({ message: 'Aluno deletado com sucesso!' });
        } catch (erro) {
            res.send(erro);
        }
    }
}

module.exports = CrudAlunos;
