export type Article = {
  title: string,
  snippet: string
}

export type ResultProps = {
  params: Promise<{ title: string }>
}

// export type ArticleDetProps = {
//   params:
// }


export type ArticleDet = {
  title: string
  summary: string,
  url: string
  words: [number, string][],
  sentiment: string
}