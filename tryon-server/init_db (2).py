from app import app, db
from models import Product, User

def init_db():
    """Initialize database with sample data"""
    with app.app_context():
        # Create all tables
        db.create_all()

        # Check if products already exist
        if Product.query.count() == 0:
            # Sample products
            products = [
                Product(
                    name="Floral Dress",
                    description="Elegant floral dress perfect for special occasions",
                    price=2500,  # $25.00
                    image_filename="floral.png",
                    category="Dresses",
                    in_stock=True
                ),
                Product(
                    name="Denim Jacket",
                    description="Classic denim jacket with modern fit",
                    price=3500,  # $35.00
                    image_filename="denim.png",
                    category="Jackets",
                    in_stock=True
                ),
                Product(
                    name="Stylish Shirt",
                    description="Premium cotton shirt for everyday wear",
                    price=4200,  # $42.00
                    image_filename="shirt.png",
                    category="Shirts",
                    in_stock=True
                ),
                Product(
                    name="Designer Blouse",
                    description="Designer blouse with intricate detailing",
                    price=3000,  # $30.00
                    image_filename="blouse.png",
                    category="Blouses",
                    in_stock=True
                ),
                Product(
                    name="Silk Scarf",
                    description="Luxurious silk scarf with artistic print",
                    price=1500,  # $15.00
                    image_filename="scarf.png",
                    category="Accessories",
                    in_stock=True
                ),
                Product(
                    name="Leather Handbag",
                    description="Genuine leather handbag with gold accents",
                    price=8500,  # $85.00
                    image_filename="handbag.png",
                    category="Accessories",
                    in_stock=True
                )
            ]

            for product in products:
                db.session.add(product)

            db.session.commit()
            print("Sample products added to database")

        # Create admin user if not exists
        admin = User.query.filter_by(email='admin@stitchandstyle.com').first()
        if not admin:
            admin = User(
                email='admin@stitchandstyle.com',
                name='Admin User',
                is_admin=True
            )
            db.session.add(admin)
            db.session.commit()
            print("Admin user created")

        print("Database initialized successfully!")

if __name__ == "__main__":
    init_db()