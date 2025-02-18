from app import app, db
from models import User, Song, Mixtape, MixtapeItem
from faker import Faker
import random

fake = Faker()

# For the future, consider replacing fake data here with a seed file that
# seeds the same things every time it is run. We're running into merge
# conflicts due to this seeding, but it would still be useful for the 
# user of the app to have data already in the db

# See Users
def seed_users(num=10):
    users = []
    for _ in range(num):
        username = fake.user_name()
        password = fake.password()
        user = User(username=username, password=password)
        users.append(user)
    
    db.session.add_all(users)
    db.session.commit()
    print(f"{num} Users seeded!")

# Seed Songs
def seed_songs(num=20):
    songs = []
    for _ in range(num):
        name = fake.word().title()
        artist = fake.name()
        album = fake.word().title()
        duration = random.randint(180, 300)  # Duration in seconds (3-5 minutes)
        song = Song(name=name, artist=artist, album=album, duration=duration)
        songs.append(song)
    
    db.session.add_all(songs)
    db.session.commit()
    print(f"{num} Songs seeded!")

# Seed Mixtapes
def seed_mixtapes(num=10):
    mixtapes = []
    for _ in range(num):
        title = fake.word().title() + " Mixtape"
        description = fake.text(max_nb_chars=200)
        user_id = random.randint(1, 10)  # Assigning to an existing user (between 1 and 10)
        mixtape = Mixtape(title=title, description=description, user_id=user_id)
        mixtapes.append(mixtape)
    
    db.session.add_all(mixtapes)
    db.session.commit()
    print(f"{num} Mixtapes seeded!")

# Seed MixtapeItems
def seed_mixtape_items(num=30):
    mixtape_items = []
    for _ in range(num):
        mixtape_id = random.randint(1, 10)  # Random mixtape ID
        song_id = random.randint(1, 20)  # Random song ID
        status = random.choice(["unlistened", "listened"])
        mixtape_item = MixtapeItem(mixtape_id=mixtape_id, song_id=song_id, status=status)
        mixtape_items.append(mixtape_item)
    
    db.session.add_all(mixtape_items)
    db.session.commit()
    print(f"{num} MixtapeItems seeded!")

# Function to seed the database
def seed_database():
    with app.app_context():
        # Drop existing tables and create new ones
        db.drop_all()  
        db.create_all()
        
        # Seed the database with fake data
        seed_users(10)  # 10 users
        seed_songs(20)  # 20 songs
        seed_mixtapes(10)  # 10 mixtapes
        seed_mixtape_items(30)  # 30 mixtape items

        print("Database seeded successfully!")

if __name__ == "__main__":
    seed_database()
