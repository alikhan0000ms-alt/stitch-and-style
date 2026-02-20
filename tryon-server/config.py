import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Base configuration"""
    SECRET_KEY = os.environ.get('SECRET_KEY')
    JWT_SECRET = os.environ.get('JWT_SECRET')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///stitch_style.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Folder paths
    UPLOAD_FOLDER = os.environ.get('UPLOAD_FOLDER', 'static/uploads')
    RESULT_FOLDER = os.environ.get('RESULT_FOLDER', 'static/results')
    DRESS_FOLDER = os.environ.get('DRESS_FOLDER', 'static/dresses')
    
    # JWT configuration
    JWT_EXPIRATION_HOURS = int(os.environ.get('JWT_EXPIRATION_HOURS', 24))
    
    @staticmethod
    def validate():
        """Validate that critical secrets are set"""
        if not Config.SECRET_KEY:
            raise ValueError('ERROR: SECRET_KEY environment variable must be set in .env file')
        if not Config.JWT_SECRET:
            raise ValueError('ERROR: JWT_SECRET environment variable must be set in .env file')

class DevelopmentConfig(Config):
    DEBUG = True
    TESTING = False

class ProductionConfig(Config):
    DEBUG = False
    TESTING = False

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}