// frontend/src/app/news/[id]/page.tsx

import Link from 'next/link';

interface NewsDetail {
  id: number;
  title: string;
  link: string; // Yahooの元リンク
  summary?: string;
  content?: string;
  pubDate: string;
}

// 1件だけ取得する関数
async function getNewsDetail(id: string) {
  // バックエンドAPIのURL（必要に応じて変更してください）
  const res = await fetch(`http://localhost:4000/news/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function NewsDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const news: NewsDetail | null = await getNewsDetail(id);

  if (!news) {
    return <div className="p-10 text-center">記事が見つかりませんでした。</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <Link href="/news" className="text-blue-600 hover:underline mb-6 inline-block">
        ← 一覧に戻る
      </Link>

      <article className="bg-white p-8 rounded-xl shadow-md border">
        <h1 className="text-2xl font-bold mb-4">{news.title}</h1>
        <p className="text-gray-500 mb-6 text-sm">
          {new Date(news.pubDate).toLocaleString()}
        </p>

        {/* 要約を表示 */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8 border-l-4 border-blue-500">
           <h3 className="font-bold text-gray-700 mb-2">AI要約</h3>
           <p className="text-gray-700 leading-relaxed">
             {news.summary || news.content || '詳細情報はありません。'}
           </p>
        </div>

        <div className="text-center">
          <a 
            href={news.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition"
          >
            Yahoo!ニュースで全文を読む
          </a>
        </div>
      </article>
    </div>
  );
}