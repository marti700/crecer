export type Article = {
  title: string,
  snippet: string
 }

export type ResultProps = {
  params:
  {
    title: string
  }
}

export type ArticleDetProps = {
    params: {
        title: string
    }
}

export type ArticleDet = {
    title: string
    summary: string,
    url: string
    words: [number, string][],
}