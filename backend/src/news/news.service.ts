// src/news/news.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as Parser from 'rss-parser';
import { PrismaService } from '../prisma/prisma.service'; // Prismaをインポート

interface NewsItem {
  title?: string;
  link?: string;
  pubDate?: string;
  contentSnippet?: string;
  [key: string]: any;
}

interface NewsFeed {
  title?: string;
  description?: string;
  [key: string]: any;
}

@Injectable()
export class NewsService {
  private readonly logger = new Logger(NewsService.name);
  private readonly parser: Parser<NewsFeed, NewsItem> = new Parser<
    NewsFeed,
    NewsItem
  >();
  private readonly RSS_URL = 'https://news.yahoo.co.jp/rss/topics/sports.xml';

  constructor(private prisma: PrismaService) {}

  async fetchNews() {
    this.logger.log('Yahoo!ニュースを取得してDBに同期します...');

    try {
      const feed = await this.parser.parseURL(this.RSS_URL);

      // 1. 取得したRSSをDBに保存（既にある記事はスキップ、新しい記事だけ追加）
      for (const item of feed.items) {
        if (!item.link) continue;

        await this.prisma.news.upsert({
          where: { link: item.link }, // URLを重複チェックのキーにする
          update: {}, // すでに存在する場合は何もしない
          create: {
            // 存在しない場合は新しく作成
            title: item.title ?? '',
            link: item.link,
            pubDate: item.pubDate ? new Date(item.pubDate) : new Date(),
          },
        });
      }

      // 2. DBから最新の20件を取得して返す
      // これにより、過去に取得したニュースもリストに表示されるようになります
      const savedNews = await this.prisma.news.findMany({
        orderBy: { pubDate: 'desc' },
        take: 20,
      });

      return savedNews;
    } catch (error) {
      this.logger.error('ニュース同期エラー:', error);
      throw new Error('ニュースの取得に失敗しました');
    }
  }
}
