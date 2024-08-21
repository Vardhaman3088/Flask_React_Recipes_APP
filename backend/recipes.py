from flask import Flask,request,jsonify, make_response
from flask_restx import Api, Resource, fields, Namespace
from config import DevConfig
from models import Recipe, User
from exts import db
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token,jwt_required



recipe_ns = Namespace('recipe', description="A namespace for Recipe")



# model (Serialiser)
#This defines the data model for the recipe API endpoints. This model is used to serialize and deserialize the data exchanged between the client and the server.
recipe_model = recipe_ns.model(
    "Recipe",{
        "id":fields.Integer(),
        "title":fields.String(),
        "description":fields.String()
    }
)


@recipe_ns.route('/recipes')
class RecipesResource(Resource):
    @recipe_ns.marshal_list_with(recipe_model)
    def get(self):
        """Get all recipes """
        recipes = Recipe.query.all()
        # return recipes, 201  # You can send the response code like thi because you have used the serialiser here there will be problem when you use the make_response
        return recipes
      


    @recipe_ns.marshal_with(recipe_model)
    @recipe_ns.expect(recipe_model)   # This is use to tell the api how should be the payload for sending the data to the server we can see the difference in swagger api which is accessible at http://127.0.0.1:5000/docs
    @jwt_required()  # After adding this you have to first generate the access_token using the login route then to access this route go to postman select authorization select beared_token enter the access_token that you get from login into the input box provided in the authorisation then you will be able to access the list of recipes make sure that you are correctly coppied the access_token  `because any changes to it will not allow you to see the list of recipes   OR  you can also use the header tab present in the postman just select header then in key enter "Authorisation" and in value Write Bearer {access_token} value should be like this "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyMjk0MzU4NSwianRpIjoiOGUxODhkZDYtNWIxZi00MjRiLWI1YWItM2YyNDUwNDc4OWZiIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InZhcmRoeSIsIm5iZiI6MTcyMjk0MzU4NSwiY3NyZiI6IjZiNDdiYWQxLTg5YzMtNGU2MC05YWQ2LTAzMjRkM2QxY2Y4ZiIsImV4cCI6MTcyMjk0NDQ4NX0.UD622cHEUKsAyMdhcl7g1mz6vwJqYzytLgo4SkSz86o" without double quotes
    def post(self):
        """Create New Recipe"""

        data= request.get_json()
        new_recipe = Recipe(
            title=data.get('title'),
            description=data.get('description')

        )
        # print(data)

        new_recipe.save()
        return new_recipe,201



@recipe_ns.route('/recipe/<int:id>')
class RecipeResource(Resource):

    @recipe_ns.marshal_with(recipe_model)
    def get(self, id):
        """Get a recipe by id"""
        # print("This is the id " +str(id))
        try:
            recipe = Recipe.query.get_or_404(id)
            # print("Hello")
            # print(recipe)
            return recipe
        except Exception as e:
            return {"message": f"Recipe not found with id{id}"}, 404
        
    @jwt_required() 
    @recipe_ns.marshal_with(recipe_model)
    def put(self, id):
        """Update a recipe """

        recipe_to_update=Recipe.query.get_or_404(id)
        data = request.get_json()
        # print(data)
        recipe_to_update.update(data.get('title'), data.get('description'))

        return recipe_to_update


    @recipe_ns.marshal_with(recipe_model)
    @jwt_required()
    def delete(self, id):
        """Delete the recipe by id"""
        recipe_to_delete = Recipe.query.get_or_404(id)
        recipe_to_delete.delete()
        return recipe_to_delete

 


@recipe_ns.route('/hello')
class HelloResource(Resource):
    def get(self):
        return {"message":"Hello world"}
