import { DataSource, DataSourceOptions } from 'typeorm'

let dbConfig: DataSourceOptions;

switch(process.env.NODE_ENV) {
  case 'development':
    dbConfig = {
      type: 'sqlite', 
      database: 'db.sqlite',
      synchronize: false,
      migrationsRun:true,
      logging: true,
      migrations: ['dist/migrations/**.js'],
      entities: ['dist/**/**.entity.js'],
    }
    break;
  case 'test':
    dbConfig = {
      type: 'sqlite', 
      database: 'db.sqlite',
      synchronize: false,
      logging: false,
      migrations: ['migrations/*.js'],
      entities: ['**/*.entity.ts'],
    }
    break;
  case 'production':
    break;
  default:
    throw new Error('no env');
}

export const AppDataSource = new DataSource(dbConfig)