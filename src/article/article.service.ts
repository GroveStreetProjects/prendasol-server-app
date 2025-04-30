import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Articulo } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {

  constructor(
    @InjectRepository(Articulo)
    private articleRepository: Repository<Articulo>,
  ) { };

  createArticle(article: CreateArticleDto) {
    const newArticle = this.articleRepository.create(article);
    return this.articleRepository.save(newArticle);
  }

  getAllArticles() {
    return this.articleRepository.find();
  }

  getArticle(id: number) {
    return this.articleRepository.findOne({
      where: {
        Id: id
      }
    });
  }

  deleteArticle(id: number) {
    return this.articleRepository.delete({ Id: id });
  }

  updateArticle(id: number, client: UpdateArticleDto) {
    this.articleRepository.update({ Id: id }, client)
  }

}
