import { DataSource } from 'typeorm';

import { Product, Stock } from './entities';

const { DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  ssl: {
    rejectUnauthorized: false
  },
  synchronize: true,
  logging: true,
  entities: [Product, Stock],
})
