from query import *
from flask import Flask
import json


airesp={
    "msg":"htn"
}
airesp_string=json.dumps(airesp)
# print(airesp_string)

voiceflow_response = response

app = Flask(__name__)

@app.route("/")
def hello_world():
    return voiceflow_response.text