from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from filters.sentiment.run import is_positive as is_positive
from filters.banned_words.bwFilter import check_banned_words as bwFilter

app = Flask(__name__)
cors = CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.post("/filter")
@cross_origin()
def callFilter():
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
        useEnglishSentiment: boolean;
        useForbiddenWords: boolean;
        forbiddenWords: string[];
        allowImage: boolean;
    }
    """
    filter_config = request.json["filter_config"]

    if filter_config["useEnglishSentiment"]:
        result["englishSentiment"] = is_positive(txt)
    
    if filter_config["useForbiddenWords"]:
        banned_words = filter_config["forbiddenWords"]
        result["bannedWords"] = bwFilter(banned_words, txt)

    return jsonify(result)


# main driver function
if __name__ == "__main__":
    app.run()
    
"""
To test the api call, run the following command in the terminal:

curl -X POST -H "Content-Type: application/json" -d '{"post": {"content": {"text": "I love this product!"}}, "filter_config": {"forbiddenWords": ["hate", "awful"]}}' http://localhost:5000/filter
"""