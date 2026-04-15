from flask import Blueprint
from models.menu import MenuItem
from extensions import db

menu_bp = Blueprint("menu", __name__)


@menu_bp.route("/seed")
def seed_menu():
    # Clear old data
    MenuItem.query.delete()

    items = [
        # Appetizers
        {"name": "Paneer Tikka", "price": 8.99, "category": "starter", "image": "cheese.jpg"},
        {"name": "Samosa", "price": 5.99, "category": "starter", "image": "samosa.jpg"},
        {"name": "Chicken Wings", "price": 9.99, "category": "starter", "image": "crispychickenwings.jpg"},

        # Mains
        {"name": "Butter Chicken", "price": 14.99, "category": "main", "image": "butterchickenwithrice.jpg"},
        {"name": "Biryani", "price": 13.99, "category": "main", "image": "rice.jpg"},
        {"name": "Chicken Tikka Masala", "price": 15.99, "category": "main", "image": "tandoorichickenwithrice.jpg"},

        # Sides
        {"name": "Fries", "price": 4.99, "category": "side", "image": "freshfries.jpg"},
        {"name": "Rice", "price": 3.99, "category": "side", "image": "rice.jpg"},

        # Desserts
        {"name": "Gulab Jamun", "price": 6.99, "category": "dessert", "image": "cheese.jpg"},
        {"name": "Ice Cream", "price": 5.49, "category": "dessert", "image": "cheese.jpg"},

        # Drinks
        {"name": "Coke", "price": 2.99, "category": "drink", "image": "cheese.jpg"},
        {"name": "Lassi", "price": 3.99, "category": "drink", "image": "cheese.jpg"}
    ]

    for item in items:
        db.session.add(MenuItem(**item))

    db.session.commit()

    return {"message": "Menu seeded successfully ✅"}


@menu_bp.route("/", methods=["GET"])
def get_menu():
    items = MenuItem.query.all()

    return [
        {
            "id": item.id,
            "name": item.name,
            "price": item.price,
            "category": item.category,
            "image": item.image
        }
        for item in items
    ]
