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
);`



async function main() {
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();
    await client.query(SQL);
    await client.query(TESTSQL);
    await client.end();
}

main();