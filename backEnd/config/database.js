import dotenv from 'dotenv';
dotenv.config();
import { createPool } from 'mysql2/promise';

export const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    port: process.env.DB_PORT 
});

pool.getConnection()
    .then(() => console.log('FUNCA LA BASE DE DATOS'))
    .catch(err => console.error('NO FUNCA LA BASE DE DATOS:', err));
