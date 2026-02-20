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
import jwt
from datetime import datetime, timedelta
from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash
from config import config
from models import db, Product, User, Order, OrderItem, Customization, TryOnResult

app = Flask(__name__, static_folder="static")
app.config.from_object(config['development'])

# Validate critical secrets before starting
config['development'].validate()

# Initialize extensions
db.init_app(app)

# CORS Configuration - restrict to localhost only (no wildcard)
CORS(
    app,
    resources={
        r"/api/*": {
            "origins": ["http://localhost:5173", "http://localhost:3000"],
            "methods": ["GET", "POST", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True,
            "max_age": 3600
        }
    }
)

UPLOAD_FOLDER = app.config['UPLOAD_FOLDER']
RESULT_FOLDER = app.config['RESULT_FOLDER']
DRESS_FOLDER = app.config['DRESS_FOLDER']

for path in (UPLOAD_FOLDER, RESULT_FOLDER, DRESS_FOLDER):
    os.makedirs(path, exist_ok=True)

# Create tables on first run
with app.app_context():
    db.create_all()

# ==================== JWT & SECURITY CONFIGURATION ====================
JWT_SECRET = app.config['JWT_SECRET']
JWT_EXPIRATION_HOURS = 24

# File upload security
MAX_UPLOAD_SIZE = 5 * 1024 * 1024  # 5MB
ALLOWED_IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp'}
MAX_ORDER_QUANTITY = 10

def generate_jwt_token(user_id, email):
    """Generate JWT token for user"""
    payload = {
        'user_id': user_id,
        'email': email,
        'exp': datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS),
        'iat': datetime.utcnow()
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm='HS256')
    return token

def verify_jwt_token(token):
    """Verify JWT token and return payload or error dict"""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return {'error': 'Token expired', 'code': 'EXPIRED'}
    except jwt.InvalidTokenError:
        return {'error': 'Invalid token', 'code': 'INVALID'}

def protected_route(f):
    """Decorator to protect routes with JWT"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({"error": "Missing authorization token"}), 401
        
        # Validate token format
        if not auth_header.startswith('Bearer '):
            return jsonify({"error": "Invalid authorization header format. Use: Bearer <token>"}), 401
        
        try:
            # Extract token from "Bearer <token>"
            token = auth_header[7:]  # Remove 'Bearer ' prefix (7 chars)
            payload = verify_jwt_token(token)
            
            # Check if payload contains error
            if isinstance(payload, dict) and 'error' in payload:
                error_code = payload.get('code', 'INVALID')
                if error_code == 'EXPIRED':
                    return jsonify({"error": "Token expired. Please log in again."}), 401
                else:
                    return jsonify({"error": "Invalid token."}), 401
            
            # Valid token - extract user info
            request.user_id = payload['user_id']
            request.user_email = payload['email']
        except Exception as e:
            return jsonify({"error": "Token verification failed."}), 401
        
        return f(*args, **kwargs)
    
    return decorated_function

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
    
    # SECURITY: Validate file extension
    file_ext = os.path.splitext(selfie_file.filename)[1].lower()
    if file_ext not in ALLOWED_IMAGE_EXTENSIONS:
        return jsonify({"error": f"Invalid file type. Allowed: {', '.join(ALLOWED_IMAGE_EXTENSIONS)}"}), 400
    
    # SECURITY: Sanitize filename using werkzeug utility
    from werkzeug.utils import secure_filename
    safe_filename = secure_filename(selfie_file.filename)
    if not safe_filename:
        safe_filename = f"upload{file_ext}"
    
    # SECURITY: Check file size BEFORE saving
    selfie_file.seek(0, os.SEEK_END)
    file_size = selfie_file.tell()
    if file_size > MAX_UPLOAD_SIZE:
        return jsonify({"error": f"File too large. Maximum size: 5MB"}), 400
    
    # SECURITY: Validate MIME type (basic check)
    selfie_file.seek(0)
    if not selfie_file.content_type or not selfie_file.content_type.startswith('image/'):
        return jsonify({"error": "Invalid file type. Expected image file"}), 400
    
    # Reset file pointer before saving
    selfie_file.seek(0)
    
    # Save selfie with sanitized name
    selfie_name = f"{uuid.uuid4().hex}_{safe_filename}"
    selfie_path = os.path.join(UPLOAD_FOLDER, selfie_name)
    
    try:
        selfie_file.save(selfie_path)
    except Exception as e:
        return jsonify({"error": "Failed to save file"}), 500

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
        # Clean up the uploaded file if processing fails
        if os.path.exists(selfie_path):
            os.remove(selfie_path)
        return jsonify({"error": "Processing failed"}), 500

    result_url = f"/static/results/{result_name}"
    return jsonify({
        "product_id": product_id,
        "result_url": result_url,
        "message": "Try-on generated",
        "tryon_id": tryon_result.id
    }), 200

@app.route("/api/order", methods=["POST"])
def create_order():
    """Create an order with user info and product"""
    data = request.json or {}
    
    # Validate required fields
    if not data.get('product_id') or not data.get('user_info'):
        return jsonify({"error": "Missing product_id or user_info"}), 400
    
    try:
        user_info = data['user_info']
        
        # Validate email format
        if '@' not in user_info.get('email', ''):
            return jsonify({"error": "Invalid email format"}), 400
        
        if not user_info.get('name'):
            return jsonify({"error": "Name is required"}), 400
        
        # Get or create user
        user = User.query.filter_by(email=user_info['email']).first()
        if not user:
            user = User(
                email=user_info['email'],
                name=user_info['name']
            )
            db.session.add(user)
            db.session.flush()
        
        # Get product
        product = Product.query.get(data['product_id'])
        if not product:
            return jsonify({"error": "Product not found"}), 404
        
        # SECURITY: Validate product is in stock
        if not product.in_stock:
            return jsonify({"error": "Product is out of stock"}), 400
        
        # SECURITY: Validate quantity
        quantity = data.get('quantity', 1)
        if quantity <= 0:
            return jsonify({"error": "Quantity must be positive"}), 400
        
        # SECURITY: Enforce max quantity limit
        if quantity > MAX_ORDER_QUANTITY:
            return jsonify({"error": f"Maximum {MAX_ORDER_QUANTITY} items per order"}), 400
        
        # SECURITY: Calculate TOTAL ON SERVER (don't trust frontend)
        total_amount = product.price * quantity
        
        # OPTIONAL: Verify frontend didn't send invalid amount
        if data.get('total_amount'):
            frontend_amount = data.get('total_amount')
            if frontend_amount != total_amount:
                return jsonify({"error": "Price mismatch. Please refresh and try again."}), 400
        
        # Create order
        order = Order(
            user_id=user.id,
            total_amount=total_amount,
            shipping_address=user_info.get('shipping_address', ''),
            status='pending',
            payment_status='pending'
        )
        db.session.add(order)
        db.session.flush()
        
        # Create order items
        order_item = OrderItem(
            order_id=order.id,
            product_id=product.id,
            quantity=quantity,
            price=product.price
        )
        db.session.add(order_item)
        
        # Save customization if provided
        if 'measurements' in data:
            customization = Customization(
                user_id=user.id,
                product_id=product.id,
                measurements=data['measurements'],
                status='submitted'
            )
            db.session.add(customization)
        
        # Commit all changes
        db.session.commit()
        
        return jsonify({
            "status": "success",
            "message": "Order created successfully",
            "order_id": order.id,
            "user_id": user.id,
            "total_amount": total_amount
        }), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": "Failed to create order",
            "details": str(e)
        }), 500


@app.route("/api/orders/<int:user_id>", methods=["GET"])
@protected_route
def get_user_orders(user_id):
    """Get all orders for a specific user (users can only view their own orders)"""
    # SECURITY: Verify user can only access their own orders
    if request.user_id != user_id:
        return jsonify({"error": "Access denied. You can only view your own orders."}), 403
    
    try:
        orders = Order.query.filter_by(user_id=user_id).all()
        
        return jsonify([{
            "id": order.id,
            "status": order.status,
            "payment_status": order.payment_status,
            "total_amount": order.total_amount,
            "shipping_address": order.shipping_address,
            "created_at": order.created_at.isoformat(),
            "items": [{
                "product_id": item.product_id,
                "product_name": item.product.name,
                "quantity": item.quantity,
                "price": item.price
            } for item in order.items]
        } for order in orders]), 200
    
    except Exception as e:
        return jsonify({"error": "Failed to fetch orders", "details": str(e)}), 500


@app.route("/api/admin/orders", methods=["GET"])
@protected_route
def get_all_orders():
    """Admin endpoint: Get all orders (protected)"""
    user = User.query.get(request.user_id)
    if not user or not user.is_admin:
        return jsonify({"error": "Admin access required"}), 403
    
    try:
        orders = Order.query.all()
        return jsonify([{
            "id": order.id,
            "user_id": order.user_id,
            "user_name": order.user.name,
            "user_email": order.user.email,
            "status": order.status,
            "total_amount": order.total_amount,
            "created_at": order.created_at.isoformat(),
            "item_count": len(order.items)
        } for order in orders]), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch orders", "details": str(e)}), 500

@app.route("/static/<path:filename>")
def serve_static(filename):
    """Serve static files"""
    return send_from_directory('static', filename)


# ==================== AUTHENTICATION ENDPOINTS ====================

@app.route("/api/auth/register", methods=["POST"])
def register():
    """Register a new user"""
    data = request.json or {}
    
    # Validate required fields
    if not data.get('email') or not data.get('password') or not data.get('name'):
        return jsonify({"error": "Missing email, password, or name"}), 400
    
    # Validate email format
    if '@' not in data['email'] or len(data['email']) < 5:
        return jsonify({"error": "Invalid email format"}), 400
    
    # Validate password strength (simple check)
    if len(data['password']) < 6:
        return jsonify({"error": "Password must be at least 6 characters"}), 400
    
    try:
        # Check if user already exists
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            return jsonify({"error": "Email already registered"}), 409
        
        # Create new user with hashed password
        user = User(
            email=data['email'],
            name=data['name'],
            password_hash=generate_password_hash(data['password']),
            is_admin=False
        )
        
        db.session.add(user)
        db.session.commit()
        
        # Generate JWT token
        token = generate_jwt_token(user.id, user.email)
        
        return jsonify({
            "status": "success",
            "message": "Registration successful",
            "user_id": user.id,
            "email": user.email,
            "name": user.name,
            "token": token
        }), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Registration failed", "details": str(e)}), 500


@app.route("/api/auth/login", methods=["POST"])
def login():
    """Login user and return JWT token"""
    data = request.json or {}
    
    if not data.get('email') or not data.get('password'):
        return jsonify({"error": "Missing email or password"}), 400
    
    try:
        user = User.query.filter_by(email=data['email']).first()
        
        if not user or not check_password_hash(user.password_hash, data['password']):
            return jsonify({"error": "Invalid email or password"}), 401
        
        # Generate JWT token
        token = generate_jwt_token(user.id, user.email)
        
        return jsonify({
            "status": "success",
            "message": "Login successful",
            "user_id": user.id,
            "email": user.email,
            "name": user.name,
            "is_admin": user.is_admin,
            "token": token
        }), 200
    
    except Exception as e:
        return jsonify({"error": "Login failed", "details": str(e)}), 500


@app.route("/api/auth/verify", methods=["GET"])
@protected_route
def verify_auth():
    """Verify current authentication token"""
    return jsonify({
        "status": "authenticated",
        "user_id": request.user_id,
        "user_email": request.user_email
    }), 200


@app.route("/api/user/<int:user_id>", methods=["GET"])
@protected_route
def get_user_profile(user_id):
    """Get user profile (protected)"""
    if request.user_id != user_id:
        return jsonify({"error": "Cannot access other user's profile"}), 403
    
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        return jsonify({
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "is_admin": user.is_admin,
            "created_at": user.created_at.isoformat()
        }), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch profile", "details": str(e)}), 500


@app.route("/api/admin/users", methods=["GET"])
@protected_route
def get_all_users():
    """Get all users (admin only)"""
    user = User.query.get(request.user_id)
    if not user or not user.is_admin:
        return jsonify({"error": "Admin access required"}), 403
    
    try:
        users = User.query.all()
        return jsonify([{
            "id": u.id,
            "email": u.email,
            "name": u.name,
            "is_admin": u.is_admin,
            "created_at": u.created_at.isoformat(),
            "order_count": len(u.orders)
        } for u in users]), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch users", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)