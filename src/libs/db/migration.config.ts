import 'tsconfig-paths/register';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { GlobalConfig } from '../config';

ConfigModule.forRoot();
const config = GlobalConfig();
console.log('Database logging:', config.typeorm.url);

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: config.typeorm.url,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/libs/db/migrations/*.js'],
  ssl: config.typeorm.ssl,
  synchronize: false,
};

const datasource = new DataSource(dataSourceOptions);

export default datasource;
