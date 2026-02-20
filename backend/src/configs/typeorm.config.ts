import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT ?? '3306', 10),
    username: process.env.DB_USERNAME || 'makers',
    password: process.env.DB_PASSWORD || 'SpotOnMakers',
    database: process.env.DB_DATABASE || 'spoton',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: false
}