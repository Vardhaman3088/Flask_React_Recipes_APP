from exts import db

"""
class Recipe:
    id:int primary key
    title: str
    description: str( text)
    date_added : str(text)
"""

class Recipe(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(), nullable=False)
    description= db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return f"<Recipe {self.title} {self.description}, {self.id}>"
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, title, description):
        self.title= title
        self.description = description
        
        # print("saving,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"+str(self))
        db.session.commit()


#User Model

"""
class User:
    id:Integer
    username : string
    emain: string
    password: string
"""

class User(db.Model):
    id= db.Column(db.Integer(), primary_key=True)
    username= db.Column(db.String(25), nullable = False, unique=True)
    email = db.Column(db.String(80), nullable=False)
    password = db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return f"This is the user object with the username: {self.username} email={self.email} password: {self.password}"
    

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password
        db.session.commit()

