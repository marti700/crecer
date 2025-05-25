import { ArticleDet } from "@/app/Types";
import ArticleTableButtons from "@/app/components/ArticlesTableButtons";

export const dynamic = 'force-dynamic'

async function getSavedArticles() {
  const url = `http://api:8000/articles`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}


export default async function MyArticles() {
  const articles: ArticleDet[] = await getSavedArticles();

  console.log(articles);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Titulo
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>

              {articles.map((value, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {value.title}
                  </th>

                  <td className="px-6 py-4">
                    <ArticleTableButtons article={value} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}