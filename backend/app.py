from flask import Flask
from config import Config
from extensions import db, cors

# Import routes
from routes.menu_routes import menu_bp
from routes.cart_routes import cart_bp
from routes.order_routes import order_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    cors.init_app(app)

    # Register Blueprints
    app.register_blueprint(menu_bp, url_prefix="/api/menu")
    app.register_blueprint(cart_bp, url_prefix="/api/cart")
    app.register_blueprint(order_bp, url_prefix="/api/order")

    # ✅ CREATE TABLES HERE (correct place)
    with app.app_context():
        db.create_all()

    @app.route("/")
    def home():
        return {"message": "Backend running 🚀"}

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=10000)
