
from flask import Flask
import json


airesp={
    "msg":"htn"
}
airespjson=json.dumps(airesp)

app = Flask(__name__)

@app.route("/api")
def hello_world():
    return airesp