import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Articulo } from './article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Articulo])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule { }
