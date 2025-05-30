import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { ClientModule } from './client/client.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    ClientModule,
    ArticleModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'prendasol_test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
})
export class AppModule { }

// Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.