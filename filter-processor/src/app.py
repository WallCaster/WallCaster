import datetime
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from filters.sentiment.run import is_positive as is_positive
from filters.banned_words.bwFilter import check_banned_words as bwFilter
# from filters.nsfw.nsfwFilter import isNsfw

app = Flask(__name__)
cors = CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.post("/filter")
@cross_origin()
def callFilter():
    """
    type of result is:
    {
        passedSentiment?: boolean;
        passedBanwords?: boolean;
        passedImages?: boolean;
        passedNsfw?: boolean;
        filterDate : Date;
    }
    """
    result = {}

    """
    type of post is:
    {
        id: string;
        author: {
            name: string;
            username: string;
            image?: string;
        };
        content: {
            text: string;
            images?: string[];
        };
        date: Date;
        originUrl: string;
        api: ApiType;
    };
    """
    post = request.json["post"]
    txt = post["content"]["text"]
    """
    type of filter_config is: 
    {
        useSentiment: false,
        useBanwords: false,
        useBlockImages: false,
        forbiddenWords: [],
    }
    """
    filter_config = request.json["filter_config"]


    if filter_config["useSentiment"]:
        result["passedSentiment"] = is_positive(txt)

    if filter_config["useBanwords"]:
        banned_words = filter_config["forbiddenWords"]
        result["passedBanwords"] = not bwFilter(banned_words, txt)

    if filter_config["useBlockImages"]:
        images = post["content"]["images"]
        hasImages = images is not None and len(images) > 0
        result["passedImages"] = not hasImages

    if filter_config["useNsfw"]:
        images = post["content"]["images"]
        # result["passedNsfw"] = not isNsfw(images)

    result["filterDate"] = datetime.datetime.now().isoformat()
    return jsonify(result)


# main driver function
if __name__ == "__main__":
    app.run()

"""
To test the api call, run the following command in the terminal:

curl -X POST -H "Content-Type: application/json" -d '{"post": {"content": {"text": "I love this product!"}}, "filter_config": {"forbiddenWords": ["hate", "awful"]}}' http://localhost:5000/filter
"""