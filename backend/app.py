from database import *
from query import *
from flask import Flask, request
import json
from gptfile import *
from flask_cors import CORS, cross_origin


supabase = supabase_auth()

app = Flask(__name__)
CORS(app)

@app.route('/summarize', methods=['POST'])
@cross_origin(origin='*')
def upload_file():
    if 'file' in request.files:
        file = request.files['file']
        file.save(file.filename)
    result = summarize(file.filename, "math")
    return json.dumps({"msg": result})

@app.route('/flashcard-gen', methods=['POST'])
@cross_origin(origin='*')
def card_gen():
    if 'file' in request.files:
        file = request.files['file']
        file.save(file.filename)
    result = flashcard(file.filename)
    return json.dumps({"msg": result})

@app.route('/notes-summary', methods=['POST'])
@cross_origin(origin='*')
def hand_notes():
    if 'file' in request.files:
        file = request.files['file']
        file.save(file.filename)
    result = handNotes(file.filename)
    return json.dumps({"msg": result["summary"], "transcript": result["transcript"]})

@app.route('/text-flashcard', methods=['POST'])
@cross_origin(origin='*')
def text_card_gen():
    text = request.json['text']
    result = flashcard(text)
    return json.dumps({"msg": result})

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
def save_cards_in_deck_handler(username, deck_name):
    cards = request.json['cards']
    response = save_cards_in_deck(supabase, user, deck_name, cards)
    return json.dumps(response)

@app.route('/api/users/<username>/decks', methods=['POST'])
def add_deck_handler(username):
    deck_name = request.json['deck_name']
    response = add_deck(supabase, username, deck_name)
    return json.dumps(response)





