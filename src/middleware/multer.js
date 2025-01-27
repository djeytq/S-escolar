const multer = require('multer');
const path = require('path');

// Configuração do armazenamento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Filtro de arquivos
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    // console.log(file.mimetype)
    // console.log(file.originalname)

    if (extname && mimetype) {
        // console.log('Arquivo aceito!');
        return cb(null, true);
    } else {
        cb(new Error('Tipo de arquivo não suportado!'));
    }
};

// Configuração do multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 2 }, // Limite de 5MB
    fileFilter: fileFilter
});

module.exports = {storage, upload};
