import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

db_path = os.path.join(BASE_DIR, "database", "db.sqlite3")

class Config:
    SECRET_KEY = "secret-key"
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{db_path}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
print("DB PATH:", db_path)
