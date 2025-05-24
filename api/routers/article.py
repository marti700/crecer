from fastapi import APIRouter
from pydantic import BaseModel
import psycopg


class Article(BaseModel):
    title: str
    summary: str
    words: list


router = APIRouter()

conn = psycopg.connect(dbname="saved_articles",
                       host="postgres",
                       user="postgres",
                       password="password",
                       port="5432")


@router.post('/articles/save', status_code=201)
async def save_article(article: Article):
    """
        Saves an Article into the database

        Args:
            article an article object consisting of a title, summary and the top 5 repeating words of the article

        Returns:
            An http 201 status code indicating the article have been created in the db and The id of the inserted article
            if an error occurs an http 500 error response is returned

    """
    print(article)
    with conn.cursor() as cur:
        query = """
            INSERT INTO article_details (title, url, summary, saved_date)
            VALUES (%s, %s, %s, %s)
            RETURNING id;
            """
        cur.execute(query, (
            article.title,
            f"https://en.wikipedia.org/${article.title}",
            article.summary,
            None
        ))
        conn.commit()
        return cur.fetchone()[0]


@router.get('/articles')
async def get_saved_article():
    with conn.cursor() as cur:
        query = "select * FROM article_details"
        cur.execute(query)
        articles = []
        for row in cur.fetchall():
            article = {}
            id, title, url, summary, saved_date = row
            article['title'] = title
            article['summary'] = summary
            article['url'] = url
            articles.append(article)

        print(articles)
        return articles
