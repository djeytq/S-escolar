const express = require('express');
const app = express();
const routes = require('./routes');
const Migration = require('./migration');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // Importar o módulo path

dotenv.config();
Migration();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'html/index.html')); // Corrigir para path.resolve
});

app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('server is running on port ' + PORT);
});