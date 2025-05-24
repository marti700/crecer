import Link from "next/link"
import {Article, ResultProps} from '@/app/Types'

async function getArticles(title: string) {
  const url = `http://localhost:8000/search/article/${title}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export default async function Results({ params }: ResultProps) {
  // const p = await params
  // const title =  p.title
  const title = params.title
  const searchQuery = decodeURIComponent(title);
  console.log(searchQuery);
  const articles: Article[] = await getArticles(searchQuery);
  console.log(articles)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
            Resultados
          </h5>

          <ul className="my-4 space-y-3">
            {articles.map((value, index) => (
              <li key={index}>
                <Link href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                  <span className="flex-10 ms-3 whitespace-nowrap">{value.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}