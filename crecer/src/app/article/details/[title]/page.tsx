import SaveArticleButton from "@/app/components/SaveArticleButtons";
import { ResultProps, ArticleDet } from "@/app/Types";
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";

async function getArticleDetails(title: string) {
  const url = `http://api:8000/search/article/${title}/details`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export default async function Details({ params }: ResultProps) {
  const p = await params;
  const title = p.title;
  const searchQuery = decodeURIComponent(title);
  const article: ArticleDet = await getArticleDetails(searchQuery);

  return (
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
          <AccordionPanel>
            <AccordionTitle>Analysis de sentimiento</AccordionTitle>
            <AccordionContent>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                {article.sentiment}
              </p>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
        <SaveArticleButton article={article} />
      </main>
    </div>
  )
}
