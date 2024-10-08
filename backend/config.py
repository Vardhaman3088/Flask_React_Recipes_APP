from decouple import config
import os 

BASE_DIR=os.path.dirname(os.path.realpath(__file__))

class Config:
    SECRET_KEY = config("SECRET_KEY")
    SQLALCHEMY_TRACK_MODIFICATION=config('SQLALCHEMY_TRACK_MODIFICATION', cast=bool)


class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI="sqlite:///"+os.path.join(BASE_DIR,'dev.db')
    DEBUG=True
    SQLALCHEMY_ECHO=True  # This will print the sql generated commands everytime the database operation is done on the SQL lite 


class ProdConfig(Config):
    pass

class TestConfig(Config):
    SQLALCHEMY_DATABASE_URI="sqlite:///test.db"
    SQLALCHEMY_ECHO=False
    TESTING=True





