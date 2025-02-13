from flask import request, jsonify, session
from config import app, db
from sqlalchemy.exc import IntegrityError
from models import User, Song, Mixtape, MixtapeItem
from flask_cors import CORS

CORS(app)



@app.get("/")
def index():
    return jsonify({ "message": "Hello, world!" })


# USER ROUTES

# POST /register: Register a new user. (Tested using PostMan - 200)
@app.post("/register")
def register_user():
    new_user = request.json

    if not new_user["username"] or not new_user["password"]:
        return jsonify({"error": "Username and password are required fields."}), 400
    try:
        db.session.add(User(username=new_user["username"], password=new_user["password"]))
        db.session.commit()
        return jsonify({"message:": "User created!"}), 201
    except IntegrityError:
        return jsonify({"error": "Username already exists, please try another one."})
    except Exception as exception:
        return jsonify({"error": str(exception)})

# POST /login: Log in. (Created test user in DB and tested via Postman, 200 OK)
@app.post("/login")
def user_login():
    user_entry = request.json
    username = user_entry["username"]
    password = user_entry["password"]
    if not username or not password:
        return jsonify({"error": "Username and password are required for login."})
    user=User.query.filter_by(username=username).first()
    if not user or user.password != password:
        return jsonify({"error": "Inavalid username or password."}), 401
    # Store user_id in session after log in
    session["user_id"] = user.id
    return jsonify({"message": "You have successfully logged in!"}), 200

# GET /users/:id : Retrieve a specific user's information. (Tested via Postman, 200 OK)
@app.get("/users/<int:user_id>")
def get_user(user_id):
    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({"error": "User not found."})
    return jsonify(user.to_dict()), 200

@app.get("/users/<int:user_id>/mixtapes")
def get_user_mixtapes(user_id):
    # Retrieve user_id from the session
    logged_in_user_id = session.get("user_id")

    if logged_in_user_id != user_id:
        return jsonify({"error": "You do not have permission to view this user's mixtapes."}), 403

    # Fetch the mixtapes for the logged-in user
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found."}), 404
    
    mixtapes = user.mixtapes  # Get all mixtapes associated with the user
    
    mixtape_list = [mixtape.to_dict() for mixtape in mixtapes]
    
    return jsonify({"mixtapes": mixtape_list}), 200


#
# 
# 
# 
# 
# SONG ROUTES

# GET/songs: Get all songs (Tested via postman, 200 OK)
@app.get("/songs")
def get_songs():
    songs = Song.query.all()
    if not songs:
        return jsonify({"error": "no songs found."}), 404
    song_list = [{"id": song.id, "name": song.name, "artist": song.artist, "album": song.album} for song in songs]

    return jsonify({"songs": song_list}), 200

#POST/songs: Create a new song (tested via postman, 200 ok)
@app.post("/songs")
def create_new_song():
    new_song = request.json
    if not new_song["name"] or not new_song["artist"]:
        return jsonify({"error": "Name and artist fields are required"}), 400
    try:
        song = Song(name=new_song["name"], artist=new_song["artist"], album=new_song.get("album"), duration=new_song.get("duration"))
        db.session.add(song)
        db.session.commit()
        return jsonify(song.to_dict())
    except Exception as exception:
        return jsonify({"error": str(exception)}), 500
    
#PATCH/songs/id: Update a song (tested in Postman, 200 OK)
@app.patch("/songs/<int:song_id>")
def update_song(song_id):
    updated_song = request.json
    song = Song.query.filter_by(id=song_id).first()
    if not song:
        return jsonify({"error": "Song not found in database."}), 404
    
    if "name" in updated_song:
        song.name = updated_song["name"]
    if "artist" in updated_song:
        song.artist = updated_song["artist"]
    if "album" in updated_song:
        song.album = updated_song["album"]
    if "duration" in updated_song:
        song.duration = updated_song["duration"]

    try:
        db.session.commit()
        return jsonify(song.to_dict())
    except Exception as exception:
        return jsonify({"error": str(exception)}), 500


#DELETE/songs.id: Delete a song (Tested via Postman, 200 OK)
@app.delete("/songs/<int:song_id>")
def delete_song(song_id):
    song = Song.query.filter_by(id=song_id).first()
    if not song:
        return jsonify({"error": "Song with that ID not found."}), 404
    try:
        db.session.delete(song)
        db.session.commit()
        return jsonify({"message": "Song deleted successfully!"})
    except Exception as exception:
        return jsonify({"error": str(exception)}), 500
    
#GET/songs/search: Search for songs by attribute? (Tested via postman, 200 OK)
@app.get("/songs/search")
def search_songs():
    name = request.args.get("name")
    artist = request.args.get("artist")
    album = request.args.get("album")
    query = Song.query

    if name:
        query = query.filter(Song.name.ilike(f"%{name}%"))
    if artist:
        query = query.filter(Song.artist.ilike(f"%{artist}%"))
    if album:
        query = query.filter(Song.album.ilike(f"%{album}%"))

    songs = query.all()
    if not songs:
        return jsonify({"error": "Sorry, no songs found matching these specifications."})
    song_data = [{"id": song.id, "name": song.name, "artist": song.artist, "album": song.album, "duration": song.duraton} for song in songs ]
    return jsonify({"songs": song_data}), 200
    
# 
# 
# 
#
#
# MIXTAPE ROUTES

# GET /mixtapes: Get all mixtapes
@app.get("/mixtapes")
def get_mixtapes():
    user_id = session.get("user_id")  # Get the user ID from the session

    if not user_id:
        return jsonify({"error": "You must be logged in to view mixtapes."}), 401  # Ensure user is logged in

    mixtapes = Mixtape.query.filter_by(user_id=user_id).all()  # Fetch only the mixtapes associated with the logged-in user
    if not mixtapes:
        return jsonify({"error": "No mixtapes found."}), 404
    mixtape_list = [mixtape.to_dict() for mixtape in mixtapes]
    return jsonify({"mixtapes": mixtape_list}), 200

# GET /mixtapes/:id: Retrieve a specific mixtape's information
@app.get("/mixtapes/<int:mixtape_id>")
def get_mixtape(mixtape_id):
    user_id = session.get("user_id")  # Get the user_id from session
    if not user_id:
        return jsonify({"error": "You must be logged in to view mixtapes."}), 401
    mixtape = Mixtape.query.filter_by(id=mixtape_id, user_id=user_id).first()  # Ensure mixtape belongs to logged-in user
    if not mixtape:
        return jsonify({"error": "Mixtape not found."}), 404
    return jsonify(mixtape.to_dict()), 200

# POST /mixtapes: Create a new mixtape
@app.post("/mixtapes")
def create_mixtape():
    user_id = session.get("user_id")  # Get user_id from the session 
    title = request.json.get('title')

    if not user_id:
        return jsonify({"error": "You must be logged in to create a mixtape."}), 401  # Ensure the user is logged in
    
    if not title or not user_id:
        return jsonify({"error": "Title and user_id are required fields."}), 400
    
    new_mixtape = Mixtape(
        title=title,
        user_id=user_id,  
        description=request.json.get('description', "")
    )
    
    try:
        db.session.add(new_mixtape)
        db.session.commit()
        return jsonify(new_mixtape.to_dict()), 201
    except Exception as exception:
        return jsonify({"error": str(exception)}), 500

# PATCH /mixtapes/:id: Update a mixtape
@app.patch("/mixtapes/<int:mixtape_id>")
def update_mixtape(mixtape_id):
    user_id = session.get("user_id")
    updated_mixtape = request.json
    mixtape = Mixtape.query.filter_by(id=mixtape_id, user_id=user_id).first()  # Ensure mixtape belongs to logged-in user

    if not mixtape:
        return jsonify({"error": "Mixtape not found."}), 404
    
    if "title" in updated_mixtape:
        mixtape.title = updated_mixtape["title"]
    if "description" in updated_mixtape:
        mixtape.description = updated_mixtape["description"]
    if "user_id" in updated_mixtape:
        mixtape.user_id = updated_mixtape["user_id"]

    try:
        db.session.commit()
        return jsonify(mixtape.to_dict())
    except Exception as exception:
        return jsonify({"error": str(exception)}), 500

# DELETE /mixtapes/:id: Delete a mixtape
@app.delete("/mixtapes/<int:mixtape_id>")
def delete_mixtape(mixtape_id):
    user_id = session.get("user_id")
    mixtape = Mixtape.query.filter_by(id=mixtape_id, user_id=user_id).first()  # Ensure the logged-in user owns the mixtape

    if not mixtape:
        return jsonify({"error": "Mixtape not found."}), 404
    try:
        MixtapeItem.query.filter_by(mixtape_id=mixtape_id).delete() # Deletes associated mixtape-items
        db.session.delete(mixtape)
        db.session.commit()
        return jsonify({"message": "Mixtape deleted successfully!"}), 200
    except Exception as exception:
        return jsonify({"error": str(exception)}), 500

#
#
#
#
#
# MIXTAPEITEMS ROUTES

# GET /mixtape-items: Get all mixtape items
@app.get("/mixtape-items")
def get_mixtape_items():
    mixtape_items = MixtapeItem.query.all()
    if not mixtape_items:
        return jsonify({"error": "No mixtape items found."}), 404
    mixtape_item_list = [mixtape_item.to_dict() for mixtape_item in mixtape_items]
    return jsonify({"mixtape_items": mixtape_item_list}), 200

# POST /mixtape-items: Add a song to a mixtape
@app.post("/mixtape-items")
def create_mixtape_item():
    user_id = session.get("user_id")  # Get user_id from session
    
    if not user_id:
        return jsonify({"error": "You must be logged in to add a song to a mixtape."}), 401

    new_item = request.json
    mixtape_id = new_item.get("mixtape_id")
    song_id = new_item.get("song_id")
    
    if not mixtape_id or not song_id:
        return jsonify({"error": "Mixtape ID and Song ID are required fields."}), 400
    
    mixtape = Mixtape.query.filter_by(id=mixtape_id, user_id=user_id).first()  # Ensure the mixtape belongs to the logged-in user
    
    if not mixtape:
        return jsonify({"error": "Mixtape not found or you do not have permission to add items to it."}), 404

    try:
        mixtape_item = MixtapeItem(
            mixtape_id=mixtape_id,
            song_id=song_id,
            status=new_item.get("status", "unlistened")
        )
        db.session.add(mixtape_item)
        db.session.commit()
        return jsonify(mixtape_item.to_dict()), 201
    except Exception as exception:
        return jsonify({"error": str(exception)}), 500

# PATCH /mixtape-items/:id: Update a mixtape item
@app.patch("/mixtape-items/<int:mixtape_item_id>")
def update_mixtape_item(mixtape_item_id):
    updated_item = request.json
    mixtape_item = MixtapeItem.query.filter_by(id=mixtape_item_id).first()
    if not mixtape_item:
        return jsonify({"error": "Mixtape item not found."}), 404
    
    if "status" in updated_item:
        mixtape_item.status = updated_item["status"]
    if "mixtape_id" in updated_item:
        mixtape_item.mixtape_id = updated_item["mixtape_id"]
    if "song_id" in updated_item:
        mixtape_item.song_id = updated_item["song_id"]

    try:
        db.session.commit()
        return jsonify(mixtape_item.to_dict())
    except Exception as exception:
        return jsonify({"error": str(exception)}), 500

# DELETE /mixtape-items/:id: Delete a mixtape item
@app.delete("/mixtape-items/<int:mixtape_item_id>")
def delete_mixtape_item(mixtape_item_id):
    mixtape_item = MixtapeItem.query.filter_by(id=mixtape_item_id).first()
    if not mixtape_item:
        return jsonify({"error": "Mixtape item not found."}), 404
    try:
        db.session.delete(mixtape_item)
        db.session.commit()
        return jsonify({"message": "Mixtape item deleted successfully!"}), 200
    except Exception as exception:
        return jsonify({"error": str(exception)}), 500


    


if __name__ == "__main__":
    app.run(debug=True)