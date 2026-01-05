import { Injectable, Logger } from '@nestjs/common'; // OnModuleInit を削除
import * as Parser from 'rss-parser';

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
  // implements OnModuleInit を削除
  private readonly logger = new Logger(NewsService.name);

  private readonly parser: Parser<NewsFeed, NewsItem> = new Parser<
    NewsFeed,
    NewsItem
  >();

  private readonly RSS_URL = 'https://news.yahoo.co.jp/rss/topics/sports.xml';

  // onModuleInit() メソッドごと削除

  async fetchNews() {
    // ログは少し控えめにしておきましょう
    this.logger.log('Yahoo!ニュースを取得します...');
    try {
      const feed = await this.parser.parseURL(this.RSS_URL);

      const formattedNews = feed.items.slice(0, 5).map((item) => {
        return {
          title: item.title ?? '',
          link: item.link ?? '',
          pubDate: item.pubDate ?? '',
          snippet: item.contentSnippet ?? '',
        };
      });

      return formattedNews;
    } catch (error) {
      this.logger.error('RSS取得エラー:', error);
      throw new Error('ニュースの取得に失敗しました');
    }
  }
}
