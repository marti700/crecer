// import SaveArticleButton from "@/components/ArticleDetailsButtons";
import { ArticleDetProps, ArticleDet } from "@/app/Types";
import Link from "next/link";

async function getArticleDetails(title: string) {
    const url = `http://localhost:8000/search/article/${title}/details`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}

export default async function Details({ params }: ArticleDetProps) {
    // const p = await params
    // const title =  p.title
    const title = params.title
    const searchQuery = decodeURIComponent(title);
    console.log(searchQuery);
    const article: ArticleDet = await getArticleDetails(searchQuery);
    console.log(article)

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

                <div className="relative flex flex-col my-6 bg-gray-800 shadow-sm border border-slate-200 rounded-lg w-96">
                    <div className="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
                        <span className="text-xl text-white-600 font-large font-semibold">
                            {article.title.replaceAll('%20', ' ')}
                        </span>
                    </div>

                    <div className="p-4">
                        <h5 className="mb-2 text-gray-100">
                            {article.summary}
                        </h5>
                        <Link href="#" type="button" className="text-white bg-gray-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-blue-700">Leer mas</Link>
                        <button type="button" className="text-white bg-gray-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            Guardar en favoritos
                        </button>

                    </div>
                </div>
            </main>
        </div>
    )
}
