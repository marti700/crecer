import SaveArticleButton from "@/app/components/SaveArticleButtons";
import { ArticleDetProps, ArticleDet } from "@/app/Types";
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";

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
    // <div classNameNameName="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //     <main classNameNameName="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

    //         <div classNameNameName="relative flex flex-col my-6 bg-gray-800 shadow-sm border border-slate-200 rounded-lg w-96">
    //             <div classNameNameName="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
    //                 <span classNameNameName="text-xl text-white-600 font-large font-semibold">
    //                     {article.title.replaceAll('%20', ' ')}
    //                 </span>
    //             </div>

    //             <div classNameNameName="p-4">
    //                 <h5 classNameNameName="mb-2 text-gray-100">
    //                     {article.summary}
    //                 </h5>
    //                 <SaveArticleButton article={article} />
    //             </div>
    //         </div>
    //     </main>
    // </div>


    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Accordion>
          <AccordionPanel>
            <AccordionTitle>{article.title.replaceAll('%20', ' ')}</AccordionTitle>
            <AccordionContent>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                {article.summary}
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel>
            <AccordionTitle>5 palabras mas usadas</AccordionTitle>
            <AccordionContent>
              <ol className="mb-2 text-gray-500 dark:text-gray-400">
                {article.words.map((value, index) => (
                  <li key={index}>{`'${value[1]}' se repite ${value[0]} veces`}</li>
                ))}
              </ol>

            </AccordionContent>
          </AccordionPanel>
          {/* <AccordionPanel>
            <AccordionTitle>What are the differences between Flowbite and Tailwind UI?</AccordionTitle>
            <AccordionContent>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                The main difference is that the core components from Flowbite are open source under the MIT license, whereas
                Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone
                components, whereas Tailwind UI offers sections of pages.
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no
                technical reason stopping you from using the best of two worlds.
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
              <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                <li>
                  <a href="https://flowbite.com/pro/" className="text-cyan-600 hover:underline dark:text-cyan-500">
                    Flowbite Pro
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindui.com/"
                    rel="nofollow"
                    className="text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Tailwind UI
                  </a>
                </li>
              </ul>
            </AccordionContent>
          </AccordionPanel> */}
        </Accordion>
        <SaveArticleButton article={article} />
      </main>
    </div>
  )
}
