const sqlite3 = require('sqlite3').verbose();

function createDb() {
    const db = new sqlite3.Database('database.db');

    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                compatibility TEXT,
                supplier TEXT,
                supplier_logo TEXT,
                price REAL
            )
        `);

        db.run(`
            INSERT INTO products (name, description, compatibility, supplier, supplier_logo, price) VALUES
            ('Placa-Mãe', 'Placa-mãe de alta qualidade.', 'Intel, AMD', 'Fornecedor A', 'fornecedor_a.png', 500.00),
            ('Placa de Vídeo', 'Placa de vídeo de alta performance.', 'PCIe', 'Fornecedor B', 'fornecedor_b.png', 1500.00),
            ('Processador', 'Processador rápido e eficiente.', 'LGA 1151', 'Fornecedor C', 'fornecedor_c.png', 800.00),
            ('Cooler', 'Cooler silencioso.', 'Universal', 'Fornecedor D', 'fornecedor_d.png', 100.00),
            ('Fonte', 'Fonte de alimentação potente.', 'ATX', 'Fornecedor E', 'fornecedor_e.png', 200.00),
            ('Memória RAM', 'Memória RAM de alta velocidade.', 'DDR4', 'Fornecedor F', 'fornecedor_f.png', 300.00),
            ('SSD', 'SSD rápido e confiável.', 'SATA', 'Fornecedor G', 'fornecedor_g.png', 400.00)
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                phone TEXT,
                credit_card TEXT
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS cart (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                product_id INTEGER,
                quantity INTEGER,
                FOREIGN KEY (user_id) REFERENCES users (id),
                FOREIGN KEY (product_id) REFERENCES products (id)
            )
        `);
    });

    db.close();
}

createDb();
