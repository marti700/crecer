from fastapi import FastAPI
from .routers import article_search, article

app = FastAPI()

app.include_router(article_search.router)
app.include_router(article.router)

