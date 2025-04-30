import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

import { ArticleService } from './article.service';
import { Articulo } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articulos')
export class ArticleController {

  constructor(private articleService: ArticleService) { };

  @Post()
  createClient(@Body() newClient: CreateArticleDto): Promise<Articulo> {
    return this.articleService.createArticle(newClient);
  }

  @Get()
  getAllClients(): Promise<Articulo[]> {
    return this.articleService.getAllArticles();
  }

  @Get(':id')
  getClient(@Param('Id', ParseIntPipe) id: number) {
    return this.articleService.getArticle(id);
  }

  @Delete(':id')
  deleteClient(@Param('Id', ParseIntPipe) id: number) {
    return this.articleService.deleteArticle(id);
  }

  @Patch(':id')
  updateClient(@Param('Id', ParseIntPipe) id: number, @Body()
  user: UpdateArticleDto) {
    return this.articleService.updateArticle(id, user);
  }

}
