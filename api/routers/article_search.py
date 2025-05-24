from fastapi import APIRouter
import requests

router = APIRouter()

@router.get("/search/article/{name}", tags=['search'])
async def article_search(name: str) -> list:
    """
    Searches for wikipedia articles based on the given name and returns a list of relevant articles

    Args:
        name: a string representing the name of the article

    Returns:
        A list of relevant articles each entry of the list contains a dictionary with the following keys
          title: the tile of the article
          snipped: a short summary of the article
    """
    response = requests.get(
        f"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={name.replace(' ', '%20')}&utf8&format=json")

    response_list = []
    for elemennt in response.json()["query"]["search"]:
        res_dic = {}
        res_dic['title'] = elemennt['title']
        res_dic['snippet'] = elemennt['snippet']
        response_list.append(res_dic)

    return  response_list