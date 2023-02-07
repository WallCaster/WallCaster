from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from filters.sentiment.run import is_positive as is_positive
app = Flask(__name__)
cors = CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.post("/filter")
@cross_origin()
def callFilter():
    content = request.json.content
    txt = content.txt
    return jsonify({"result": is_positive(txt)})


# main driver function
if __name__ == "__main__":
    app.run()