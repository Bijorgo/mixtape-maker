from flask import request, jsonify, session, redirect, url_for
from config import app, db
from sqlalchemy.exc import IntegrityError
from models import User, Song, Mixtape, MixtapeItem
from flask_cors import CORS
# Note: I uesed AI to comment out all logic pertaining to log in and uder id

# Logic for user log in / authentication has been commented out
# It is currently not operable and it stands in the way of functionality of
# the rest of the application. It has not been deleted yet so that we have
# the oportunity to implement and fix it later. The break lies in using session
# to keep the user logged in, as well as making the connection from user to
# mixtapes in the database.

CORS(app, supports_credentials=True)

@app.get("/")
def index():
    return jsonify({ "message": "Hello, world!" })

# USER ROUTES

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

@app.post("/login")
def user_login():
    user_entry = request.json
    username = user_entry["username"]
    password = user_entry["password"]

    if not username or not password:
        return jsonify({"error": "Username and password are required for login."})
    user = User.query.filter_by(username=username).first()

    if not user or user.password != password:
        return jsonify({"error": "Invalid username or password."}), 401

    # Commented out the session management for login
    # session["user_id"] = user.id

    # Removed redirect to mixtapes for user
    return jsonify({"message": "Login successful!"})

# Removed routes that check for user_id in session or use session to get logged-in user

# SONG ROUTES

@app.get("/songs")
def get_songs():
    songs = Song.query.all()
    if not songs:
        return jsonify({"error": "No songs found."}), 404
    song_list = [{"id": song.id, "name": song.name, "artist": song.artist, "album": song.album} for song in songs]
    return jsonify({"songs": song_list}), 200

@app.post("/songs")
def create_new_song():
    try:
        new_song = request.json
        if "name" not in new_song or "artist" not in new_song:
            return jsonify({"error": "Name, artist and mixtape ID fields are required."})
        name = new_song["name"]
        artist = new_song["artist"]
        mixtape_id = new_song.get("mixtape_id")

        if mixtape_id:
            mixtape = Mixtape.query.get(mixtape_id)
            if mixtape is None:
                return jsonify({"error": " Mixtape not found."}), 404
            
        song = Song(name=name, artist=artist, album=new_song.get("album", ""), duration=new_song.get("duration"))
        db.session.add(song)
        db.session.commit()

        if mixtape_id:
            mixtape_item = MixtapeItem(mixtape_id=mixtape_id, song_id=song.id)
            db.session.add(mixtape_item)
            db.session.commit()

        return jsonify(song.to_dict()), 201
    except Exception as exception:
        return jsonify({"error": str(exception)}, 500)


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
    song_data = [{"id": song.id, "name": song.name, "artist": song.artist, "album": song.album, "duration": song.duration} for song in songs]
    return jsonify({"songs": song_data}), 200

# MIXTAPE ROUTES

@app.get("/mixtapes")
def get_mixtapes():
    # Commented out authentication check
    # user_id = session.get("user_id")  
    # if not user_id:
    #     return jsonify({"error": "You must be logged in to view mixtapes."}), 401
    try:
        mixtapes = Mixtape.query.all()  # Fetch all mixtapes without checking for user_id
        if not mixtapes:
            return jsonify({"error": "No mixtapes found."}), 404
        mixtape_list = [mixtape.to_dict() for mixtape in mixtapes]
        return jsonify({"mixtapes": mixtape_list}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Internal server error handling

@app.get("/mixtapes/<int:mixtape_id>")
def get_mixtape(mixtape_id):
    # Removed authentication check
    # user_id = session.get("user_id")  
    # if not user_id:
    #     return jsonify({"error": "You must be logged in to view mixtapes."}), 401
    mixtape = Mixtape.query.filter_by(id=mixtape_id).first()
    if not mixtape:
        return jsonify({"error": "Mixtape not found."}), 404
    return jsonify(mixtape.to_dict()), 200

@app.post("/mixtapes")
def create_mixtape():
    # Removed user_id check in session
    title = request.json.get('title')

    if not title:
        return jsonify({"error": "Title is a required field."}), 400
    
    new_mixtape = Mixtape(
        title=title,
        description=request.json.get('description', "")
    )
    
    try:
        db.session.add(new_mixtape)
        db.session.commit()
        return jsonify(new_mixtape.to_dict()), 201
    except Exception as exception:
        return jsonify({"error": str(exception)}), 500

@app.patch("/mixtapes/<int:mixtape_id>")
def update_mixtape(mixtape_id):
    updated_mixtape = request.json
    mixtape = Mixtape.query.filter_by(id=mixtape_id).first()
    if not mixtape:
        return jsonify({"error": "Mixtape not found."}), 404
    
    if "title" in updated_mixtape:
        mixtape.title = updated_mixtape["title"]
    if "description" in updated_mixtape:
        mixtape.description = updated_mixtape["description"]

    try:
        db.session.commit()
        return jsonify(mixtape.to_dict())
    except Exception as exception:
        return jsonify({"error": str(exception)}), 500

@app.delete("/mixtapes/<int:mixtape_id>")
def delete_mixtape(mixtape_id):
    mixtape = Mixtape.query.filter_by(id=mixtape_id).first()
    if not mixtape:
        return jsonify({"error": "Mixtape not found."}), 404
    try:
        MixtapeItem.query.filter_by(mixtape_id=mixtape_id).delete()  # Delete associated items
        db.session.delete(mixtape)
        db.session.commit()
        return jsonify({"message": "Mixtape deleted successfully!"}), 200
    except Exception as exception:
        return jsonify({"error": str(exception)}), 500

# MIXTAPEITEMS ROUTES

@app.get("/mixtape-items")
def get_mixtape_items_all():
    mixtape_items = MixtapeItem.query.all()
    if not mixtape_items:
        return jsonify({"error": "No mixtape items found."}), 404
    mixtape_item_list = [mixtape_item.to_dict() for mixtape_item in mixtape_items]
    return jsonify({"mixtape_items": mixtape_item_list}), 200

@app.get("/mixtape-items/<int:mixtape_id>")
def get_mixtape_items_for_mixtape(mixtape_id):
    mixtape_items = MixtapeItem.query.filter_by(mixtape_id=mixtape_id).all()
    if not mixtape_items:
        return jsonify({"mixtape_items": []})  # Return empty list instead of an error
    return jsonify({"mixtape_items": [item.to_dict() for item in mixtape_items]}), 200

@app.get("/mixtape-items")
def get_all_mixtape_items():
    mixtape_id = request.args.get("mixtape_id")
    if not mixtape_id:
        return jsonify({"error": "Missing mixtape_id"}), 400

    items = MixtapeItem.query.filter_by(mixtape_id=mixtape_id).all()
    return jsonify([item.to_dict() for item in items])



@app.post("/mixtape-items")
def create_mixtape_item():
    new_item = request.json
    mixtape_id = new_item.get("mixtape_id")
    song_id = new_item.get("song_id")
    
    if not mixtape_id or not song_id:
        return jsonify({"error": "Mixtape ID and Song ID are required fields."}), 400
    
    mixtape = Mixtape.query.filter_by(id=mixtape_id).first()
    if not mixtape:
        return jsonify({"error": "Mixtape not found."}), 404

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
    
@app.get("/mixtape-items/mixtape/<int:mixtape_id>")
def get_mixtape_items(mixtape_id):
    mixtape_items = MixtapeItem.query.filter_by(mixtape_id=mixtape_id).all()
    
    if not mixtape_items:
        return jsonify({"error": "No songs found in this mixtape."}), 404
    
    return jsonify([item.to_dict() for item in mixtape_items])


@app.delete("/mixtape-items/<int:mixtape_item_id>")
def delete_mixtape_items_by_mixtape(mixtape_item_id):
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
