const openDb  = require('../model');
const alunos = require('./alunos.js');
const administradores = require('./adms.js');

async function Migration() {
    const TABLES = [alunos, administradores];

    TABLES.forEach(table => {
        openDb().
        then(async db => {
            await db.exec(table);
            await db.close();
        });
    });
    console.log('Migration finished');
}

module.exports = Migration;