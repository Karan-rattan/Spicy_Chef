from flask import Blueprint, jsonify
from models.cart import CartItem
from models.order import Order
from extensions import db

order_bp = Blueprint("order", __name__)

@order_bp.route("/place", methods=["POST"])
def place_order():
    items = CartItem.query.all()

    if not items:
        return {"error": "Cart is empty"}, 400

    total = sum(item.price * item.quantity for item in items)

    order = Order(total=total)
    db.session.add(order)

    # Clear cart after order
    for item in items:
        db.session.delete(item)

    db.session.commit()

    return {"message": "Order placed 🎉", "total": total}
