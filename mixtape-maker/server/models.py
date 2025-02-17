from config import db, SerializerMixin, association_proxy
from sqlalchemy.orm import validates #python / app level validations


class User(db.Model):
    __tablename__="users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    # Relationships
    mixtapes = db.relationship("Mixtape", back_populates="user")
    # Serializer rules
    serializer_rules = ('mixtapes', '-mixtapes.user')

    def to_dict(self):
        return {"id": self.id, "username": self.username}

class Song(db.Model):
    __tablename__="songs"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    artist = db.Column(db.String, nullable=False)
    album = db.Column(db.String)
    duration = db.Column(db.Integer)
    # Relationships
    mix_item = db.relationship("MixtapeItem", back_populates="songs")
    # Serializer rules
    serializer_rules = ('mix_item', '-mix_item.songs')

    def to_dict(self):
        return {"id": self.id, "name": self.name, "artist": self.artist, "album": self.album, "duration": self.duration}
    
class Mixtape(db.Model):
    __tablename__="mixtapes"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, default="")
    # Foreign key relates to user
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    # Relationships
    mix_items = db.relationship("MixtapeItem", back_populates="mixtapes")
    user = db.relationship("User", back_populates="mixtapes")
    # Serializer rules
    serializer_rules = ('mix_item', 'user', '-mix_item.mixtapes', '-user.mixtapes')

    # validations
    @validates("title")
    def validate_name(self, key, value):
        if not type(value) == str:
            raise TypeError("Title must be a string.")
        return value
    
    @validates("description")
    def validate_name(self, key, value):
        if value is not None and not isinstance(value, str):  # Allow None but enforce string
            raise TypeError("Description must be a string.")
        return value

    def to_dict(self):
        return {"id": self.id, "title": self.title, "description": self.description, "user_id": self.user_id}
    
    
    

class MixtapeItem(db.Model):
    __tablename__="mixtape_items"
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String, default="unlistened", nullable=False)
    # Forgeign Keys
    mixtape_id = db.Column(db.Integer, db.ForeignKey('mixtapes.id'), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'), nullable=False)
    # Relationships
    songs = db.relationship("Song", back_populates="mix_item")
    mixtapes = db.relationship("Mixtape", back_populates="mix_items")
    # Serializer rules
    serializer_rules = ('-mixtapes', '-songs') # im not 100% sure if this is what we want

    def to_dict(self):
        return {
            "id": self.id,
            "status": self.status,
            "mixtape_id": self.mixtape_id,
            "song_id": self.song_id,
            "mixtape": self.mixtapes.to_dict() if self.mixtapes else None,
            "song": self.songs.to_dict() if self.songs else None,
        }

    