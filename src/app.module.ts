import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [ClientModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
