'use client'

import { ArticleDet } from '@/app/Types';
import Link from "next/link";

export default function ArticleTableButtons({ article }: { article: ArticleDet }) {

  return (
    <div>
      <Link
        href={{
          pathname: `/article/details/${article.title}`,
          query: {
            title: article.title,
            summary: article.summary,
            hideSaveButton: true
          }
        }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Ver</Link>
      <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Eliminar</button>
    </div>
  );
}
