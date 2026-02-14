# from flask import Flask, request, jsonify, send_from_directory
# from flask_cors import CORS
# from flask_migrate import Migrate
# from PIL import Image
# import os, uuid
# from config import config
# from models import db, Product, User, Order, OrderItem, Customization, TryOnResult

# app = Flask(__name__, static_folder="static")
# app.config.from_object(config['development'])

# # Initialize extensions
# db.init_app(app)
# migrate = Migrate(app, db)
# CORS(app)  # allow requests from React dev server

# UPLOAD_FOLDER = app.config['UPLOAD_FOLDER']
# RESULT_FOLDER = app.config['RESULT_FOLDER']
# DRESS_FOLDER = app.config['DRESS_FOLDER']

# for path in (UPLOAD_FOLDER, RESULT_FOLDER, DRESS_FOLDER):
#     os.makedirs(path, exist_ok=True)

# @app.route("/api/product/<int:product_id>")
# def get_product(product_id):
#     product = Product.query.get(product_id)
#     if not product:
#         return jsonify({"error": "Product not found"}), 404

#     return jsonify({
#         "id": product.id,
#         "name": product.name,
#         "description": product.description,
#         "price": product.price,
#         "img_url": product.image_url,
#         "category": product.category,
#         "in_stock": product.in_stock
#     })

# @app.route("/api/products")
# def get_products():
#     """Get all products with optional filtering"""
#     category = request.args.get('category')
#     in_stock = request.args.get('in_stock')

#     query = Product.query

#     if category:
#         query = query.filter_by(category=category)
#     if in_stock is not None:
#         query = query.filter_by(in_stock=in_stock.lower() == 'true')

#     products = query.all()

#     return jsonify([{
#         "id": p.id,
#         "name": p.name,
#         "description": p.description,
#         "price": p.price,
#         "img_url": p.image_url,
#         "category": p.category,
#         "in_stock": p.in_stock
#     } for p in products])

# @app.route("/api/tryon/<int:product_id>", methods=["POST"])
# def tryon(product_id):
#     product = Product.query.get(product_id)
#     if not product:
#         return jsonify({"error": "Invalid product id"}), 400

#     if "selfie" not in request.files:
#         return jsonify({"error": "No selfie uploaded"}), 400

#     selfie_file = request.files["selfie"]
#     if selfie_file.filename == "":
#         return jsonify({"error": "Empty file"}), 400

#     # Save selfie
#     selfie_name = f"{uuid.uuid4().hex}_{selfie_file.filename}"
#     selfie_path = os.path.join(UPLOAD_FOLDER, selfie_name)
#     selfie_file.save(selfie_path)

#     # Load images and produce placeholder blending
#     try:
#         user_img = Image.open(selfie_path).convert("RGBA")
#         dress_img = Image.open(os.path.join(DRESS_FOLDER, product.image_filename or "default.png")).convert("RGBA")

#         # resize both to same size (simple placeholder)
#         size = (512, 512)
#         user_img = user_img.resize(size)
#         dress_img = dress_img.resize(size)

#         # blend -> alpha controls how dress overlays selfie; this is a placeholder
#         result_img = Image.blend(user_img, dress_img, alpha=0.45)

#         result_name = f"tryon_{product_id}_{uuid.uuid4().hex}.png"
#         result_path = os.path.join(RESULT_FOLDER, result_name)
#         result_img.save(result_path)

#         # Save try-on result to database
#         tryon_result = TryOnResult(
#             product_id=product_id,
#             selfie_filename=selfie_name,
#             result_filename=result_name
#         )
#         db.session.add(tryon_result)
#         db.session.commit()

#     except Exception as e:
#         return jsonify({"error": "Processing failed", "details": str(e)}), 500

#     result_url = f"/static/results/{result_name}"
#     return jsonify({
#         "product_id": product_id,
#         "result_url": result_url,
#         "message": "Try-on generated",
#         "tryon_id": tryon_result.id
#     }), 200

# @app.route("/api/order", methods=["POST"])
# def create_order():
#     data = request.json or {}

#     # Validate required fields
#     if not data.get('product_id') or not data.get('user_info'):
#         return jsonify({"error": "Missing required fields"}), 400

#     try:
#         # Create or get user
#         user_info = data['user_info']
#         user = User.query.filter_by(email=user_info['email']).first()
#         if not user:
#             user = User(
#                 email=user_info['email'],
#                 name=user_info['name']
#             )
#             db.session.add(user)
#             db.session.flush()  # Get user ID without committing

#         # Get product
#         product = Product.query.get(data['product_id'])
#         if not product:
#             return jsonify({"error": "Product not found"}), 404

#         # Create order
#         order = Order(
#             user_id=user.id,
#             total_amount=product.price,  # For single item orders
#             shipping_address=data.get('shipping_address', ''),
#             status='pending'
#         )
#         db.session.add(order)
#         db.session.flush()

#         # Create order item
#         order_item = OrderItem(
#             order_id=order.id,
#             product_id=product.id,
#             quantity=1,
#             price=product.price
#         )
#         db.session.add(order_item)

#         # Create customization if provided
#         if 'measurements' in user_info:
#             customization = Customization(
#                 user_id=user.id,
#                 product_id=product.id,
#                 measurements=user_info['measurements'],
#                 status='submitted'
#             )
#             db.session.add(customization)

#         db.session.commit()

#         return jsonify({
#             "status": "success",
#             "order_id": order.id,
#             "message": "Order created successfully"
#         }), 201

#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": "Failed to create order", "details": str(e)}), 500

# @app.route("/api/orders/<int:user_id>")
# def get_user_orders(user_id):
#     """Get orders for a specific user"""
#     orders = Order.query.filter_by(user_id=user_id).all()

#     return jsonify([{
#         "id": order.id,
#         "status": order.status,
#         "total_amount": order.total_amount,
#         "created_at": order.created_at.isoformat(),
#         "items": [{
#             "product_id": item.product_id,
#             "product_name": item.product.name,
#             "quantity": item.quantity,
#             "price": item.price
#         } for item in order.items]
#     } for order in orders])

# @app.route("/api/customization", methods=["POST"])
# def save_customization():
#     """Save clothing customization"""
#     data = request.json or {}

#     if not data.get('user_email') or not data.get('customization'):
#         return jsonify({"error": "Missing required fields"}), 400

#     try:
#         # Get or create user
#         user = User.query.filter_by(email=data['user_email']).first()
#         if not user:
#             user = User(email=data['user_email'], name=data.get('user_name', 'Anonymous'))
#             db.session.add(user)
#             db.session.flush()

#         customization_data = data['customization']
#         customization = Customization(
#             user_id=user.id,
#             product_id=customization_data.get('product_id'),
#             fabric_type=customization_data.get('fabric'),
#             color=customization_data.get('color'),
#             dress_type=customization_data.get('dress_type'),
#             measurements=customization_data.get('measurements'),
#             status='draft'
#         )

#         db.session.add(customization)
#         db.session.commit()

#         return jsonify({
#             "status": "success",
#             "customization_id": customization.id,
#             "message": "Customization saved successfully"
#         }), 201

#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": "Failed to save customization", "details": str(e)}), 500

# if __name__ == "__main__":
#     with app.app_context():
#         db.create_all()  # Create tables if they don't exist
#     app.run(debug=True, port=5000)



from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from PIL import Image
import os, uuid
from config import config
from models import db, Product, User, Order, OrderItem, Customization, TryOnResult

app = Flask(__name__, static_folder="static")
app.config.from_object(config['development'])

# Initialize extensions
db.init_app(app)
CORS(app)  # allow requests from React dev server

UPLOAD_FOLDER = app.config['UPLOAD_FOLDER']
RESULT_FOLDER = app.config['RESULT_FOLDER']
DRESS_FOLDER = app.config['DRESS_FOLDER']

for path in (UPLOAD_FOLDER, RESULT_FOLDER, DRESS_FOLDER):
    os.makedirs(path, exist_ok=True)

# Create tables on first run
with app.app_context():
    db.create_all()

@app.route("/api/product/<int:product_id>")
def get_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    return jsonify({
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "price": product.price,
        "img_url": product.image_url,
        "category": product.category,
        "in_stock": product.in_stock
    })

@app.route("/api/products")
def get_products():
    """Get all products with optional filtering"""
    category = request.args.get('category')
    in_stock = request.args.get('in_stock')

    query = Product.query

    if category:
        query = query.filter_by(category=category)
    if in_stock is not None:
        query = query.filter_by(in_stock=in_stock.lower() == 'true')

    products = query.all()

    return jsonify([{
        "id": p.id,
        "name": p.name,
        "description": p.description,
        "price": p.price,
        "img_url": p.image_url,
        "category": p.category,
        "in_stock": p.in_stock
    } for p in products])

@app.route("/api/tryon/<int:product_id>", methods=["POST"])
def tryon(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Invalid product id"}), 400

    if "selfie" not in request.files:
        return jsonify({"error": "No selfie uploaded"}), 400

    selfie_file = request.files["selfie"]
    if selfie_file.filename == "":
        return jsonify({"error": "Empty file"}), 400

    # Save selfie
    selfie_name = f"{uuid.uuid4().hex}_{selfie_file.filename}"
    selfie_path = os.path.join(UPLOAD_FOLDER, selfie_name)
    selfie_file.save(selfie_path)

    # Load images and produce placeholder blending
    try:
        user_img = Image.open(selfie_path).convert("RGBA")
        dress_img = Image.open(os.path.join(DRESS_FOLDER, product.image_filename or "default.png")).convert("RGBA")

        # resize both to same size (simple placeholder)
        size = (512, 512)
        user_img = user_img.resize(size)
        dress_img = dress_img.resize(size)

        # blend -> alpha controls how dress overlays selfie; this is a placeholder
        result_img = Image.blend(user_img, dress_img, alpha=0.45)

        result_name = f"tryon_{product_id}_{uuid.uuid4().hex}.png"
        result_path = os.path.join(RESULT_FOLDER, result_name)
        result_img.save(result_path)

        # Save try-on result to database
        tryon_result = TryOnResult(
            product_id=product_id,
            selfie_filename=selfie_name,
            result_filename=result_name
        )
        db.session.add(tryon_result)
        db.session.commit()

    except Exception as e:
        return jsonify({"error": "Processing failed", "details": str(e)}), 500

    result_url = f"/static/results/{result_name}"
    return jsonify({
        "product_id": product_id,
        "result_url": result_url,
        "message": "Try-on generated",
        "tryon_id": tryon_result.id
    }), 200

@app.route("/api/order", methods=["POST"])
def create_order():
    data = request.json or {}
    # expected fields: product_id, user_info (email/name/measurements)
    print("Order data:", data)
    return jsonify({"status":"success", "order_id": uuid.uuid4().hex}), 200

@app.route("/static/<path:filename>")
def serve_static(filename):
    """Serve static files"""
    return send_from_directory('static', filename)

if __name__ == "__main__":
    app.run(debug=True, port=5000)