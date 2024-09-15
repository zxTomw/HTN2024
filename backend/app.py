from database import *
from query import *
from flask import Flask
import json
from flask import request

load_dotenv()
supabase = supabase_auth()

app = Flask(__name__)

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





