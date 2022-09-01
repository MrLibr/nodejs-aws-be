import { DataSource } from 'typeorm';

import { Product, Stock } from './entities';
const { HOST, PORT, DATABASE, USERNAME, PASSWORD } = process.env;

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: HOST,
    port: Number(PORT),
    username: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    ssl: {
        rejectUnauthorized: false
    },
    synchronize: true,
    logging: true,
    entities: [Product, Stock],
})
