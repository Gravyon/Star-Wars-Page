"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, json, current_app
from api.models import db, User, Character, Planet, Favorites 
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

api = Blueprint('api', __name__)

###########################
# User GET queries
###########################

@api.route('/user', methods=['GET'])
def get_users():
    ###########################
    # Get all users
    ###########################
    users = User.query.all()
    print(users)
    results = list(map(lambda x: x.serialize(), users))
    return jsonify(results), 200

@api.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    # Get one user
    user = User.query.filter_by(id=user_id).first()
    print(user)
    results = user.serialize()
    return jsonify(results), 200

###########################
# Character GET queries
###########################

@api.route('/character', methods=['GET'])
def get_characters():
    ###########################
    # Get all characters
    ###########################
    characters = Character.query.all()
    print(characters)
    results = list(map(lambda x: x.serialize(), characters))
    return jsonify(results), 200

@api.route('/character/<int:character_id>', methods=['GET'])
def get_character(character_id):
    ###########################
    # Get one character
    ###########################
    character = Character.query.filter_by(id=character_id).first()
    print(character)
    results = character.serialize()
    return jsonify(results), 200

###########################
# Planet GET queries
###########################

@api.route('/planet', methods=['GET'])
def get_planets():
    ###########################
    # Get all planets
    ###########################
    planets = Planet.query.all()
    print(planets)
    results = list(map(lambda x: x.serialize(), planets))
    print(results)
    return jsonify(results), 200

@api.route('/planet/<int:planet_id>', methods=['GET'])
def get_planet(planet_id):
    ###########################
    # Get one planet
    ###########################
    planet = Planet.query.filter_by(id=planet_id).first()
    print(planet)
    results = planet.serialize()
    return jsonify(results), 200

###########################
# Favorites GET queries
###########################

@api.route('/favorites', methods=['GET'])
def get_favorites():
    ###########################
    # Get all favorites
    ###########################
    favorites = Favorites.query.all()
    print(favorites)
    results = list(map(lambda x: x.serialize(), favorites))
    print(results)
    return jsonify(results), 200

@api.route('/favorites/<int:favorites_id>', methods=['GET'])
def get_favorite(favorites_id):
    ###########################
    # Get one favorite
    ###########################
    favorites = Favorites.query.filter_by(id=favorites_id).first()
    print(favorites)
    results = favorites.serialize()
    return jsonify(results), 200

###########################
# User POST query
###########################

@api.route('/user', methods=['POST'])
def create_user():
    # Load data from postman or input
    body = json.loads(request.data)
    print(body)
    # Filter by to check input email, this will be used in the if so email is never repeated
    user_query = User.query.filter_by(email=body["email"]).first()
    print(user_query)
    
    # If to check if user doesn't exist (by checking the email), if so, it's created
    if user_query is None:
        # Table contents, same as the one in models.py
        new_user = User(
        username=body["username"],
        name=body["name"],
        lastname=body["lastname"],
        password=body["password"],
        email=body["email"])
        print(new_user)
        # Flask command to add a new entry
        db.session.add(new_user)
        # Flask command to commit the database, saving the changes
        db.session.commit()
        # Standard response to request with error code 200 (success)
        response_body = {
            "msg": "New user created"
        }
        return jsonify(response_body), 200
    # else response if the email exists
    response_body = {
        "msg": "User email already exists"
    }
    # Ends the function by sending the error code 400 (data already exists)
    return jsonify(response_body), 400

###########################
# Planet POST query
###########################

@api.route('/planet', methods=['POST'])
def create_planet():
    # Load data from postman or input
    body = json.loads(request.data)
    print(body)
    # Filter by to check input name, this will be used in the if so name is never repeated
    planet_query = Planet.query.filter_by(name=body["name"]).first()
    print(planet_query)
    
    # "If" to check if planet doesn't exist (by checking the name), if so, it's created
    if planet_query is None:
        # Table contents, same as the one in models.py
        new_planet = Planet(name=body["name"])
        # Flask command to add a new entry
        db.session.add(new_planet)
        # Flask command to commit the database, saving the changes
        db.session.commit()
        # Standard response to request with error code 200 (success)
        response_body = {
            "msg": "New planet created"
        }
        return jsonify(response_body), 200
    # else response if the name exists
    response_body = {
        "msg": "Planet already exists"
    }
    # Ends the function by sending the error code 400 (data already exists)
    return jsonify(response_body), 400

###########################
# character POST query
###########################

@api.route('/character', methods=['POST'])
def create_character():
    # Load data from postman or input
    body = json.loads(request.data)
    print(body)
    # Filter by to check input name, this will be used in the if so name is never repeated
    character_query = Character.query.filter_by(name=body["name"]).first()
    print(character_query)
    
    # "If" to check if character doesn't exist (by checking the name), if so, it's created
    if character_query is None:
        # Table contents, same as the one in models.py
        new_character = Character(name=body["name"])
        # Flask command to add a new entry
        db.session.add(new_character)
        # Flask command to commit the database, saving the changes
        db.session.commit()
        # Standard response to request with error code 200 (success)
        response_body = {
            "msg": "New character created"
        }
        return jsonify(response_body), 200
    # else response if the name exists
    response_body = {
        "msg": "character already exists"
    }
    # Ends the function by sending the error code 400 (data already exists)
    return jsonify(response_body), 400

###########################
# Favorites POST query
###########################
@api.route('/favorites', methods=['POST'])
def create_favorites():
    # Load data from postman or input
    body = json.loads(request.data)
    print(body)

    user_query = User.query.filter_by(id=body["user_id"]).first()
    planet_query = Planet.query.filter_by(id=body["id_planet"]).first()
    character_query = Character.query.filter_by(id=body["id_character"]).first()

    print(user_query)
    print(planet_query)
    print(character_query)
    
    if user_query:
        response_body = {
            "msg": "User exists"
        }

    elif user_query is None:
        new_favorites = Favorites(
        user_id=body["user_id"],
        id_planet=body["id_planet"],
        id_character=body["id_character"])
        # Flask command to add a new entry
        db.session.add(new_favorites)
        # Flask command to commit the database, saving the changes
        db.session.commit()
        # Standard response to request with error code 200 (success)
        response_body = {
            "msg": "New favorite list created"
        }
        return jsonify(response_body), 200

    # elif user_query and not planet_query or not character_query:
    #     response_body = {
    #         "msg": "Planet or character doesn't exist"
    #     }
    #     return jsonify(response_body), 400

    response_body = {
        "msg": "Error"
    }
    # Ends the function by sending the error code 400 (data already exists)
    return jsonify(response_body), 400
    

###########################
# User DELETE query
###########################

@api.route('/user/<int:user_id>', methods=["DELETE"])
def delete_user(user_id):

    user = User.query.filter_by(id=user_id).first()
    print(user)
    # If user exists, deletes it
    if user:
        db.session.delete(user)
        db.session.commit()
        response_body = {
            "msg": "User deleted successfully"
            }
        return jsonify(response_body), 200

    elif user is None:
        raise APIException('User not found', status_code=404)
        return jsonify(user)


###########################
# Planet DELETE query
###########################

@api.route('/planet/<int:planet_id>', methods=["DELETE"])
def delete_planet(planet_id):

    planet = Planet.query.filter_by(id=planet_id).first()
    print(planet)

    if planet:
        db.session.delete(planet)
        db.session.commit()
        response_body = {
            "msg": "Planet deleted successfully"
            }
        return jsonify(response_body), 200

    elif planet is None:
        raise APIException('Planet not found', status_code=404)
        return jsonify(planet)


###########################
# Character DELETE query
###########################

@api.route('/character/<int:character_id>', methods=["DELETE"])
def delete_character(character_id):

    character = Character.query.filter_by(id=character_id).first()
    print(character)

    if character:
        db.session.delete(character)
        db.session.commit()
        response_body = {
            "msg": "character deleted successfully"
            }
        return jsonify(response_body), 200

    elif character is None:
        raise APIException('character not found', status_code=404)
        return jsonify(character)


###########################
# Favorite DELETE query
###########################

@api.route('/favorites/<int:favorite_id>', methods=["DELETE"])
def delete_favorite(favorite_id):

    favorite = Favorites.query.filter_by(id=favorite_id).first()
    # print(jsonify(favorite))

    if favorite is None:
        response_body = {
            "msg": "Favorite not found"
            }
        return jsonify(response_body), 404


    db.session.delete(favorite)
    db.session.commit()
    response_body = {
        "msg": "Favorite deleted successfully"
        }
    return jsonify(response_body), 200

###########################
# Login function
###########################

@api.route("/login", methods=["POST"])
def login():

    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # Query to get user info
    user = User.query.filter_by(email=email).first()
    ## If "user" query brings no data, then user doesn't exist
    if user is None:
        return jsonify({"msg":"User doesn't exist"}), 404
    # Compared email and password, if one of them is not correct then it rejects the login attempt
    elif email != user.email or password != user.password:
        return jsonify({"msg": "Bad email or password"}), 401
    # Grants a token if login was successful
    else:
        access_token = create_access_token(identity=email)
        response_body = {
            # Shows the token and the user info
            "msg":access_token,
            "user": user.serialize()
        }
        return jsonify(response_body), 200

###########################
# Profile function
###########################

@api.route("/profile", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    # Same as login, if the query brings nothing then it doesn't exist
    if user is None:
        return jsonify({"msg":"User doesn't exist"}), 404
    # If user is correct then it shows the user's info
    response_body = {
    "user": user.serialize()
        
    }
    return jsonify(response_body), 200

# Endpoint for revoking the current users access token. Saved the unique
# identifier (jti) for the JWT into our database.

###########################
# Logout function
###########################


@api.route("/valid-token", methods=["GET"])
@jwt_required()
def valid_token():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    # Same as login, if the query brings nothing then it doesn't exist
    if user is None:
        return jsonify({"status":False}), 404
    # If user is correct then it shows the user's info
    response_body = {
        "status": True,
        "user": user.serialize()
        
    }
    return jsonify(response_body), 200