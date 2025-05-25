from fastapi import APIRouter
import requests
import heapq

from textblob import TextBlob


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

    return response_list


@router.get("/search/article/{name}/details", tags=['search'])
async def article_search(name: str) -> dict:
    """
       Given a wikipedia article title Searches for articles details which includes:
        - title: the title of the article
        - summary: a summary of the article (the article introduction)
        - wods: the top 5 most repeated words in the article

       Args:
           name: a string representing the name of the article

       Returns:
           A dictionary with the following keys:
             title: the tile of the article
             summary: the introduction of the article
             words: a list of tuples representing the top 5 most repeated words in the article
       """

    print("################################################")
    resp = {}
    resp["title"] = name
    resp["summary"] = get_summary(name)
    full_article = get_full_article(name)
    resp["words"] = max_five_recurrent_words(full_article)
    run_sentiment_analysis_results = run_sentiment_analysis(full_article)
    sentiment = ""
    opinion = ""

    # sentiments 0 holds values for polarity
    if run_sentiment_analysis_results[0] > 0.2:
        sentiment = "Positiva"
    elif run_sentiment_analysis_results[0] < -0.2:
        sentiment = "Negativa"
    else:
        sentiment = "Neutral"

    # sentiment[1] holds values for subjectivity
    if run_sentiment_analysis_results[1] > 0.5:
        opinion = "Subjectiva"
    else:
        opinion = "Objectiva"

    resp["sentiment"] = f"El articulo tiene un tono {sentiment} y la opinion del autor parece ser {opinion}"
    return resp


def get_summary(name: str) -> str:
    """
        Given an article name returns it's introduction as a string

        Args:
            name: the name of the article
        Returns
            a string representing the article introductory text
    """
    print("##############################")
    print(
        f"https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles={name.replace(' ', '%20')}&utf8")
    response = requests.get(
        f"https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles={name.replace(' ', '%20')}&utf8")
    return get_article_text(response.json()["query"]["pages"])


def get_article_text(article_meta: dict) -> str:
    """
        The Article text representations returned by the extract wikipedia api extension is placed in an object called "pages"
        which inside have an other object which name is the same as the id of the article and this object have a key called "extract"
        property which is the property that holds the text we are intereste in.

        Example:
        "pages": {
            "5422144": {
                "pageid": 5422144,
                    "ns": 0,
                    "title": "Taylor Swift",
                    "extract": "Taylor Alison Swift (born December 13, 1989) is an American singer-songwriter. "
        }

        The function takes the text of the extract key and returns it.

        Args:
            article_meta: a dictionary with the raw structure returnded by the extract wikipedia API extension

        Returns:
            a String representing the contents of the "extract"
    """
    summary = "No summary"
    for key, value in article_meta.items():
        if isinstance(value, dict):
            for key, value in value.items():
                if key == "extract":
                    return value
    return summary


def get_full_article(name: str) -> str:
    """
        Given an article name return the article full contents as a string

        Args:
            title: an article name
        Returns:
            A string representing the full article content
    """
    response = requests.get(
        f"https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&explaintext&redirects=1&titles={name.replace(' ', '%20')}&utf8")
    return get_article_text(response.json()["query"]["pages"])


def max_five_recurrent_words(article: str) -> list:
    """
        Returns the top five more repeated words of a corpus of text.

        This method works by creating a frecuancy table of all the words in the text (excluding stop words) and then using
        a heap to "sort" the words in the map by frecuency

        Args:
            article: a courpus of text
        Returns
         a list of tuples (int, string) containing the top 5 most repeated words in the provided text
    """
    stop_words = {
        "i": True, "me": True, "my": True, "myself": True, "we": True, "our": True, "ours": True, "ourselves": True,
        "you": True, "your": True, "yours": True, "yourself": True, "yourselves": True, "he": True, "him": True, "his": True, "himself": True,
        "she": True, "her": True, "hers": True, "herself": True, "it": True, "its": True, "itself": True, "they": True, "them": True, "their": True,
        "theirs": True, "themselves": True, "what": True, "which": True, "who": True, "whom": True, "this": True, "that": True, "these": True, "those": True,
        "am": True, "is": True, "are": True, "was": True, "were": True, "be": True, "been": True, "being": True, "have": True, "has": True, "had": True,
        "having": True, "do": True, "does": True, "did": True, "doing": True, "a": True, "an": True, "the": True, "and": True, "but": True, "if": True,
        "or": True, "because": True, "as": True, "until": True, "while": True, "of": True, "at": True, "by": True, "for": True, "with": True, "about": True,
        "against": True, "between": True, "into": True, "through": True, "during": True, "before": True, "after": True, "above": True, "below": True,
        "to": True, "from": True, "up": True, "down": True, "in": True, "out": True, "on": True, "off": True, "over": True, "under": True, "again": True,
        "further": True, "then": True, "once": True, "here": True, "there": True, "when": True, "where": True, "why": True, "how": True, "all": True,
        "any": True, "both": True, "each": True, "few": True, "more": True, "most": True, "other": True, "some": True, "such": True, "no": True, "nor": True,
        "not": True, "only": True, "own": True, "same": True, "so": True, "than": True, "too": True, "very": True, "s": True, "t": True, "can": True,
        "will": True, "just": True, "don": True, "should": True, "now": True
    }

    word_counts = {}

    for w in article.split():
        if w.lower() in stop_words:
            continue
        if w in word_counts:
            word_counts[w] = word_counts[w] + 1
        else:
            word_counts[w] = 1

    counts = [(value, key) for key, value in word_counts.items()]
    heapq.heapify(counts)

    return heapq.nlargest(5, counts)

def run_sentiment_analysis(text: str) -> dict:
    blob = TextBlob(text)
    return blob.sentiment
