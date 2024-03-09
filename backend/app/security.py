from fastapi import Depends, HTTPException, status, Header
from fastapi.security import OAuth2PasswordBearer
import jwt
import time
from models.base_md import User 
from models.db_session import DBSession

SECRET_KEY = "secret_key"
ALGORITHM = "HS256"

# Function to get the current user from the token
def get_current_user(token: str = Header(None)):
    print(token)
    if token is None:
        return None
    return decode_token(token)


def decode_token(token: str):
    try:
        if not isinstance(token, str):
            raise ValueError("Token must be a string.")
        token_bytes = token.encode('utf-8')
        details = jwt.decode(
            token_bytes,
            SECRET_KEY,
            algorithms=["HS256"],
            options={"require": ["exp", "sub"]},
        )
        return details["sub"]
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None


def genrate_jwt_token(email:str):
    access_token = (
        jwt.encode(
            {"sub": email, "exp": time.time() + 64800},
            SECRET_KEY,
            algorithm="HS256",
            
        ),
    )
    return access_token