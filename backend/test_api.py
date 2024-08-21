import unittest
from main import create_app
from config import TestConfig
from exts import db


class APITestCase(unittest.TestCase):
    def setUp(self):
        self.app=create_app(TestConfig)

        self.client=self.app.test_client(self)

        with self.app.app_context():
            # db.init_app(self.app)
            
            db.create_all()

    def test_hello_world(self):
        hello_response = self.client.get('/recipe/hello')
        json = hello_response.json
        #  print(json)
        self.assertEqual(json, {"message":"Hello world"})


    def test_signUp(self):
        signUp_response = self.client.post('/auth/signup',
            json={
                "username":"testuser",
                "email":"testuser@test.com",
                "password":"password"
                }
        )

        status_code = signUp_response.status_code
        self.assertEqual(status_code, 201)

    def test_login(self):
        signUp_response = self.client.post('/auth/signup',
            json={
                "username":"testuser",
                "email":"testuser@test.com",
                "password":"password"
                }
        ) 
        login_response = self.client.post(
            'auth/login',
            json={
                "username":"testuser",
                "password":"password"
            }
        )

        status_code = login_response.status_code
        json = login_response.json
        # print(json)  # We can see in the console that login route create the access_token and the refresh token which can be used to test the other route but in that route we have to first call the login route because before each test method the setUp method is called and after each test method tearDown method is called which clear all the states created in an test method
        self.assertEqual(status_code, 200)

    def test_get_all_recipes(self):
        """TEST GETTING ALL RECIPES"""
        
        response = self.client.get('/recipe/recipes')
        # print(response.json)

        status_code = response.status_code
    
        self.assertEqual(status_code, 200)


    def test_get_one_recipe(self):
        id = 1
        response = self.client.get(f'/recipe/recipe/{id}')
        
        status_code = response.status_code
        # print(status_code)
        self.assertEqual(status_code, 404)

    def test_create_recipe(self):
        signUp_response = self.client.post('/auth/signup',
            json={
                "username":"testuser",
                "email":"testuser@test.com",
                "password":"password"
                }
        ) 
        login_response = self.client.post(
            'auth/login',
            json={
                "username":"testuser",
                "password":"password"
            }
        )

        access_token = login_response.json['access_token']
        create_recipe_response = self.client.post(
            '/recipe/recipes',
            json={
                'title':"Test Cookie",
                'description':"Test Description"
            },
            headers={
                "Authorization":f"Bearer {access_token}"
            }
        )
        status_code = create_recipe_response.status_code
        self.assertEqual(status_code, 201)


    def test_update_recipe(self):
        signUp_response = self.client.post('/auth/signup',
            json={
                "username":"testuser",
                "email":"testuser@test.com",
                "password":"password"
                }
        ) 
        login_response = self.client.post(
            'auth/login',
            json={
                "username":"testuser",
                "password":"password"
            }
        )

        access_token = login_response.json['access_token']
        create_recipe_response = self.client.post(
            '/recipe/recipes',
            json={
                'title':"Test Cookie",
                'description':"Test Description"
            },
            headers={
                "Authorization":f"Bearer {access_token}"
            }
        )
        status_code = create_recipe_response.status_code
        id = 1
        get_one =self.client.get(f'/recipe/recipe/{id}')

        update_response = self.client.put(
            f'/recipe/recipe/{id}',
            json={
                'title':"my Cookie",
                'description':"Test Description"
            },
            headers = {
                "Authorization": f"Bearer {access_token}"
            }
        )
        status_code = update_response.status_code
        self.assertEqual(status_code,200)

    def test_delete_recipe(self):
        """Delete Test for delete route"""

        signUp_response = self.client.post('/auth/signup',
            json={
                "username":"testuser",
                "email":"testuser@test.com",
                "password":"password"
                }
        ) 
        login_response = self.client.post(
            'auth/login',
            json={
                "username":"testuser",
                "password":"password"
            }
        )
        access_token = login_response.json['access_token']
        create_recipe_response = self.client.post(
            '/recipe/recipes',
            json={
                'title':"Test Cookie",
                'description':"Test Description"
            },
            headers={
                 "Authorization":f"Bearer {access_token}"
            }
        )

        getAllRecipes = self.client.get('/recipe/recipes')
        all_recipes = getAllRecipes.json
        id = all_recipes[0]['id']

        delete_response = self.client.delete(
            f'/recipe/recipe/{id}',
            headers = {
                "Authorization":f"Bearer {access_token}"
            }
        )
        status_code = delete_response.status_code
        
        self.assertEqual(status_code, 200)

     

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    

if __name__ == "__main__":
    unittest.main()