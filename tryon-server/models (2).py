from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    password_hash = db.Column(db.String(128))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_admin = db.Column(db.Boolean, default=False)

    # Relationships
    orders = db.relationship('Order', backref='user', lazy=True)
    customizations = db.relationship('Customization', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Integer, nullable=False)  # Price in cents
    image_filename = db.Column(db.String(200))
    category = db.Column(db.String(50))
    in_stock = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    orders = db.relationship('OrderItem', backref='product', lazy=True)
    customizations = db.relationship('Customization', backref='product', lazy=True)

    def __repr__(self):
        return f'<Product {self.name}>'

    @property
    def image_url(self):
        return f'/static/dresses/{self.image_filename}' if self.image_filename else None

    @property
    def price_dollars(self):
        return self.price / 100

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, confirmed, shipped, delivered, cancelled
    total_amount = db.Column(db.Integer, nullable=False)  # Total in cents
    shipping_address = db.Column(db.Text)
    payment_status = db.Column(db.String(20), default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    items = db.relationship('OrderItem', backref='order', lazy=True)

    def __repr__(self):
        return f'<Order {self.id}>'

class OrderItem(db.Model):
    __tablename__ = 'order_items'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    price = db.Column(db.Integer, nullable=False)  # Price per item in cents

    def __repr__(self):
        return f'<OrderItem {self.product_id} x {self.quantity}>'

class Customization(db.Model):
    __tablename__ = 'customizations'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    fabric_type = db.Column(db.String(50))
    color = db.Column(db.String(50))
    dress_type = db.Column(db.String(50))
    measurements = db.Column(db.JSON)  # Store measurements as JSON
    status = db.Column(db.String(20), default='draft')  # draft, submitted, in_progress, completed
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Customization {self.id}>'

class TryOnResult(db.Model):
    __tablename__ = 'tryon_results'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    selfie_filename = db.Column(db.String(200))
    result_filename = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<TryOnResult {self.id}>'