import { TypeOrmModule } from '@nestjs/typeorm';

class TestUtils {
  static database(entities: any[] = []) {
    if (entities.length === 0) {
      entities = [__dirname + '/**/*.entity{.ts,.js}'];
    }
    return TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB_TEST,
      entities: entities,
      synchronize: true,
    });
  }
}

export { TestUtils };
