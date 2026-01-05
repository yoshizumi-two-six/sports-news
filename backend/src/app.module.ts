import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { NewsService } from './news/news.service';

@Module({
  imports: [NewsModule],
  controllers: [AppController],
  providers: [AppService, NewsService],
})
export class AppModule {}
