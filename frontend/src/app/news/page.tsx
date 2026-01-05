// src/app/news/page.tsx

import Link from 'next/link';

type NewsItem = {
  title: string;
  link: string;
  pubDate: string;
  snippet: string;
};

async function getNews(): Promise<NewsItem[]> {
  const res = await fetch('http://127.0.0.1:4000/news', {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch news');
  return res.json();
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        最新ニュース一覧
      </h2>
      
      <div className="grid gap-4">
        {news.map((item, index) => (
          <div key={index} className="border p-4 rounded hover:bg-gray-50 transition">
            <Link href={item.link} target="_blank" className="block">
              <h3 className="text-lg font-semibold text-blue-700 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(item.pubDate).toLocaleString('ja-JP')}
              </p>
              <p className="text-sm text-gray-700">{item.snippet}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}