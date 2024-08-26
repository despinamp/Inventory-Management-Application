const { Client } = require("pg");
require('dotenv').config();
const SQL = `CREATE TABLE IF NOT EXISTS categories(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
title VARCHAR(30) NOT NULL);

CREATE TABLE IF NOT EXISTS items(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
title VARCHAR(50) NOT NULL,
description TEXT,
price NUMERIC NOT NULL,
quantity INTEGER NOT NULL CHECK (quantity>=0),
categoryid  INTEGER REFERENCES categories(id)
);


INSERT INTO categories (title) VALUES
('Camera Bodies'),
('Camera Lenses');`

const TESTSQL = `INSERT INTO items (title,description,price,quantity,categoryid) VALUES
('DSLR CANON EOS 90D BODY','DSLR CANON EOS 90D BODY with 32.5 megapixels,25600 max ISO,4K video and 30-1/8000 shutterspeed!',1599,4,(SELECT id FROM categories WHERE title='Camera Bodies')),
('CANON EF 50mm f/1.8 LENS','The lightest Canon EF lens, with 50mm focal length and f/1.8,this lens is a budget lens of great quality!',139,5,(SELECT id FROM categories WHERE title='Camera Lenses'));`

async function main() {
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();
    await client.query(SQL);
    await client.query(TESTSQL);
    await client.end();
}

main();