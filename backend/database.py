import os
from supabase import create_client
from dotenv import load_dotenv
load_dotenv()

def create_user(supabase, user):
    response = supabase.table("Users").select("id, user").execute()

    users = [val['user'] for val in response.data]

    if user in users:
        return

    response = supabase.table("Users").insert({"user": user}).execute()


def show_decks(supabase, user):
    response = supabase.table("Decks").select("name, Users!inner(user)").eq("Users.user", user).execute()
    return [val['name'] for val in response.data]



def show_cards_in_deck(supabase, user, deck_name):
    response = supabase.table("Cards").select("front_side, back_side, Decks!inner(name), Users!inner(user)").eq("Decks.name", deck_name).eq("Users.user", user).execute()

    return [[val['front_side'], val['back_side']] for val in response.data]



def save_cards_in_deck(supabase, user, deck_name, cards):

    # delete all cards in deck
    old_ids = supabase.table("Cards").select("id,  Decks!inner(name), Users!inner(user)").eq("Users.user", user).eq("Decks.name", deck_name).execute()
    old_ids =  [val['id'] for val in old_ids.data]

    supabase.table("Cards").delete().in_("id", old_ids).execute()

    # save new cards in deck
    response = supabase.table("Cards").select("id").execute()

    deck_id =  supabase.table("Decks").select("id, name, Users!inner(user)").eq("Users.user", user).eq("name", deck_name).execute()
    user_id =  supabase.table("Users").select("id, user").eq("user", user).execute()
    
    if len(deck_id.data) == 0 or len(user_id.data) == 0:
        return
    
    deck_id = deck_id.data[0]['id']
    user_id = user_id.data[0]['id']

    new_cards = []
    for card in cards:
        new_cards.append({"deck_id" : deck_id, "user_id" : user_id, "front_side" : card[0], "back_side" : card[1]})

    try:
        response = supabase.table("Cards").insert(new_cards).execute()
        return response
    except Exception as exception:
        return exception


def add_deck(supabase, user, deck_name):

    # Check whether the deck already exists
    deck_check = supabase.table("Decks").select("id, name, Users!inner(user)").eq("Users.user", user).eq("name", deck_name).execute()

    if len(deck_check.data) > 0:
        return

    user_id =  supabase.table("Users").select("id, user").eq("user", user).execute()
    
    if len(user_id.data) == 0:
        return

    user_id = user_id.data[0]['id']

    supabase.table("Decks").insert({ "user_id" : user_id, "name" : deck_name}).execute()

def supabase_auth():
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_KEY")

    return create_client(url, key)

