import time
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@cross_origin()
@app.route('/search', methods=['POST'])
def search():
    form_data = request.get_json()
    print(form_data)
    # After we get the data, we need to manipulate it a little and send it to the API
    # Create Github Search Query

    # name of reposatory - stays the same.
    name = f"{form_data['input']} in:name+"

    # date of creation - should not be entered empty to avoid bugs.
    date = form_data['date']
    if date != "":
        date = "+created:" + date + "+"

    # amount of stars - always in addition to min/max
    stars = form_data['stars']
    if form_data["stars"] == "":
        stars = 0

    # min/max - only if an amount of stars was entered
    minMax = form_data["minMax"]
    if minMax == "min":
        minMax = ">="
    else:
        minMax = "<="

    # languages - add each language to the query with "+" between them
    langs = ""
    for language in list(form_data["langs"].split(",")):
        langs += f"language:{language}+"

    last_query = f'https://api.github.com/search/repositories?q={name}{date}{langs}stars:{minMax}{stars} \n'
    response = requests.get(last_query).json()

    json_data = {"last_query": last_query, "response": response}
    return json_data
