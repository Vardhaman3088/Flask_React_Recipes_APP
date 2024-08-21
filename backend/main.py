from flask import Flask
from flask_restx import Api, Namespace
from models import Recipe, User
from exts import db
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager
from recipes import recipe_ns
from auth import auth_ns
from flask_cors import CORS



#This is the factory function that creates and returns the instances of the objects. following are the advantages of the factory function like Encapsulation  and Customisation(The meaning of customisation is that if I provide the instance of DevConfig to this function then it will run in the development environment if I provide the instance of the TestConfig to this function then it will run in the Testing enviroment and so on  )
def create_app(config):
    app =Flask(__name__)
    app.config.from_object(config)

    CORS(app)

    db.init_app(app)

    migrate=Migrate(app, db)
    JWTManager(app)   # This is used for jwt token, it register our app with the JWT manager
    
    api = Api(app, doc='/docs')


    #Namespace allow to organise and group related endpoints together, It provides a modular structure for your api 
    api.add_namespace(recipe_ns)
    api.add_namespace(auth_ns)


    
    
    # The @app.shell_context_processor decorator is used to make the objects available into the flask shell without needing to import them. This is perticularly usefull for quick testing and debugging
    @app.shell_context_processor
    def make_shell_context():
        return {
            "db":db,
            "Recipe":Recipe,
            "user":User
        }
    

    return app


    





