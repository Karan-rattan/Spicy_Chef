from extensions import db

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    total = db.Column(db.Float)
