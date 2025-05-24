from fastapi import FastAPI
from .routers import article_search

app1 = FastAPI()

app1.include_router(article_search.router)

# app1.get("/")
# async def root():
#     return "This is a test"
