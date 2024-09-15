from database import *
from query import *
from flask import Flask, request
import json
from gptfile import summarize
from flask_cors import CORS

supabase = supabase_auth()

app = Flask(__name__)
CORS(app)

@app.route('/summarize', methods=['POST'])
def upload_file():
    print(request.json)
    file = request.files['file']
    file.save(file.filename)
    return summarize(file.filename)

@app.route('/api/users', methods=['POST'])
def create_user_handler():
    user = request.json['user']
    response = create_user(supabase, user)
    return response

@app.route('/api/users/<user>/decks', methods=['GET'])
def show_decks_handler(user):
    response = show_decks(supabase, user)
    return json.dumps(response)


@app.route('/api/users/<username>/decks/<deck_name>', methods=['GET'])
def show_cards_in_deck_handler(username,deck_name):
    user = username
    deck_name = deck_name
    response = show_cards_in_deck(supabase, user, deck_name)
    return json.dumps(response)

@app.route('/api/users/<username>/decks/<deck_name>', methods=['POST'])   
def save_cards_in_deck_handler():
    user = request.json['user']
    deck_name = request.json['deck_name']
    cards = request.json['cards']
    response = save_cards_in_deck(supabase, user, deck_name, cards)
    return json.dumps(response)

@app.route('/api/users/<username>/decks', methods=['POST'])
def add_deck_handler():
    user = request.json['user']
    deck_name = request.json['deck_name']
    response = add_deck(supabase, user, deck_name)
    return json.dumps(response)





