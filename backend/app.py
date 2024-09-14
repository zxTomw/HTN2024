from database import *
load_dotenv()
supabase = supabase_auth()
    

user = 'deduction3'
deck_name = 'deck 12'
cards = [['f1','b1'], ['f2', 'b2']]
create_user(supabase, user)

add_deck(supabase, user, deck_name)

save_cards_in_deck(supabase, user, deck_name, cards)

user_id =  supabase.table("Users").select("id, user").eq("user", user).execute()
user_id = user_id.data[0]['id']
#response = supabase.table("Decks").select("name, id").eq("name", "deck 1").execute()
response = supabase.table("Cards").select("id,  Decks!inner(name), Users!inner(user)").eq("Users.user", user).eq("Decks.name", deck_name).execute()

response = [val['id'] for val in response.data]
print(user_id)
#print(response.data[-1]['id'])
