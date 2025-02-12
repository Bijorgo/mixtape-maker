from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy.ext.associationproxy import association_proxy
## from sqlalchemy import MetaData
from sqlalchemy.exc import IntegrityError
from sqlalchemy_serializer import SerializerMixin

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///music_app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['JSON_COMPACT'] = False

db = SQLAlchemy(app)
migrate = Migrate(app,db)