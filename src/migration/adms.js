module.exports= `
CREATE TABLE IF NOT EXISTS administradores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    cargo TEXT NOT NULL CHECK (cargo IN ('Director', 'Coordenador', 'Secretário')),
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    isActive BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;