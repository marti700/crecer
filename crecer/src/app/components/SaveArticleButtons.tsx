"use client";

import { useState } from "react";
import { ArticleDet } from "@/app/Types";
import { saveArticle } from '@/app/article/actions'
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SaveArticleButton({ article }: { article: ArticleDet }) {
    const [message, setMessage] = useState("");

    async function handleClick() {
        const result = await saveArticle(article);
        setMessage(result);
    }
    const searchParams = useSearchParams();
    const hideSaveButton = searchParams.get("hideSaveButton") === "true";

    return (
        <div>
            <Link href={`https://en.wikipedia.org/wiki/${article.title}`} type="button" className="text-white bg-gray-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-blue-700">Leer mas</Link>
            {!hideSaveButton && (
                <button onClick={handleClick} type="button" className="text-white bg-gray-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    Guardar en favoritos
                </button>)
            }
            {message && <p>{message}</p>}
        </div>
    );
}
