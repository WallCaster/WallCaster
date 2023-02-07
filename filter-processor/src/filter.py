from src import app

# from markupsafe import escape
# from flask import Flask
# from flask import url_for
# from flask import render_template
# from flask import request


# app = Flask(__name__)

# @app.route("/<name>")
# def hello_world(name):
#     return f"Hello, {escape(name)}!"

@app.route("/")
def helloworld():
    return 'Hello World'

# @app.post("/filter")
# def callFilter():
#     print(request.form['text']);
#     return true;
