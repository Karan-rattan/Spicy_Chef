from flask import Blueprint, request, jsonify
from models.cart import CartItem
from extensions import db

cart_bp = Blueprint("cart", __name__)

@cart_bp.route("/", methods=["GET"])
def get_cart():
    items = CartItem.query.all()

    result = []
    for item in items:
        result.append({
            "id": item.id,
            "name": item.name,
            "price": item.price,
            "quantity": item.quantity
        })

    return jsonify(result)


@cart_bp.route("/add", methods=["POST"])
def add_to_cart():
    data = request.json

    # Check if item already exists
    item = CartItem.query.filter_by(name=data["name"]).first()

    if item:
        item.quantity += 1
    else:
        item = CartItem(
            name=data["name"],
            price=data["price"],
            quantity=1
        )
        db.session.add(item)

    db.session.commit()

    return {"message": "Cart updated ✅"}


@cart_bp.route("/remove/<int:id>", methods=["DELETE"])
def remove_item(id):
    item = CartItem.query.get(id)

    if not item:
        return {"error": "Item not found"}, 404

    db.session.delete(item)
    db.session.commit()

    return {"message": "Item removed ❌"}
    
@cart_bp.route("/update/<int:id>", methods=["POST"])
def update_quantity(id):
    item = CartItem.query.get(id)

    if not item:
        return {"error": "Item not found"}, 404

    change = request.json.get("change", 0)
    item.quantity += change

    if item.quantity <= 0:
        db.session.delete(item)

    db.session.commit()

    return {"message": "Updated"}
