from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.post("/filter")
@cross_origin()
def callFilter():
    print(request)
    return jsonify({"result":True})
 
# main driver function
if __name__ == "__main__":
    app.run()