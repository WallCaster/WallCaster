from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from filters.sentiment.run import is_positive as is_positive
app = Flask(__name__)
cors = CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.post("/filter")
@cross_origin()
def callFilter():
    # return jsonify({"result": request.json})
    post = request.json["post"]
    filter_config = request.json["filter_config"]
    txt = post["content"]["text"]
    return jsonify({"result": is_positive(txt)})


# main driver function
if __name__ == "__main__":
    app.run()