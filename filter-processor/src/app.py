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
    post = request.json["post"]
    filter_config = request.json["filter_config"]
    txt = post["content"]["text"]
    
    banned_words = filter_config["forbiddenWords"]
    result_filter_bw = bwFilter(banned_words, txt)
    
    return jsonify({"result": is_positive(txt)})


# main driver function
if __name__ == "__main__":
    app.run()