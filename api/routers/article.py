# from fastapi import APIRouter, HTTPException
from fastapi import APIRouter, HTTPException, status
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
async def save_article(article: Article) -> int:
    """
        Saves an Article into the database

        Args:
            article an article object consisting of a title, summary and the top 5 repeating words of the article

        Returns:
            An http 201 status code indicating the article have been created in the db and The id of the inserted article
            if an error occurs an http 500 error response is returned

    """
    with conn.cursor() as cur:
        query = """
            INSERT INTO article_details (title, url, summary, saved_date)
            VALUES (%s, %s, %s, %s)
            RETURNING id;
            """
        try:
            cur.execute(query, (
                article.title,
                f"https://en.wikipedia.org/{article.title}",
                article.summary,
                None
            ))
        except psycopg.Error as e:
            conn.rollback()
            raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="An unexpected error occurred while saving the article.")
        conn.commit()
        return cur.fetchone()[0]


@router.get('/articles')
async def get_saved_articles() -> list:
    """
        Returns a list of all the articles saved in the database

    """
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


@router.delete('/article/delete/{title}')
async def delete_article(title: str):
    """
        Deletes the article with the given names from the database

        Args:
            title: the name of the wikipedia article stored in the database

        Returns:
            http 200 if the article was delted http 500 otherwise
    """
    with conn.cursor() as cur:
        query = "DELETE FROM article_details WHERE title = %s;"
        cur.execute(query, (title,))
        conn.commit()


