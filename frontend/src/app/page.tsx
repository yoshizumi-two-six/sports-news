// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center py-20">
      <h2 className="text-4xl font-bold mb-4 text-gray-800">Welcome!</h2>
      <p className="mb-8 text-gray-600">
        最新のスポーツニュースをお届けします。
      </p>
      
      <Link 
        href="/news" 
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
      >
        ニュースを見る
      </Link>
    </div>
  );
}