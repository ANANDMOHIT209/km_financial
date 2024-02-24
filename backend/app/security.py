# # security.py
# from passlib.context import CryptContext
# from jose import jwt
# from datetime import datetime, timedelta


# SECRET_KEY = "your_secret_key"
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 30

# # Create JWT token
# def create_access_token(data: dict, expires_delta: timedelta = None):
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(minutes=15)
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt


from fastapi import Depends, HTTPException, status, Header
from fastapi.security import OAuth2PasswordBearer
import jwt
import time
from models.base_md import User  # Assuming you have a User model


SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

# Function to create JWT token
# def create_access_token(data: dict, expires_delta: timedelta = None):
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(minutes=15)
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt

# Function to get the current user from the token
def get_current_user(token: str):
    print(token)
    if token is None:
        return None
    print(token)
    return decode_token(token)
    # credentials_exception = HTTPException(
    #     status_code=status.HTTP_401_UNAUTHORIZED,
    #     detail="Could not validate credentials",
    #     headers={"WWW-Authenticate": "Bearer"},
    # )
    # try:
    #     payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    #     username: str = payload.get("sub")
    #     if username is None:
    #         raise credentials_exception
    # except JWTError:
    #     raise credentials_exception
    # return {"username": username}  # Modify this based on your User model and actual user data

def decode_token(token: str):
    try:
        print(type(token))
        if not isinstance(token, str):
            raise ValueError("Token must be a string.")
        
        token_bytes = token.encode('utf-8')
        
        details = jwt.decode(
            token_bytes,
            SECRET_KEY,
            algorithms=["HS256"],
            options={"require": ["exp", "sub"]},
        )
        print(details["sub"])
        return details["sub"]
    # except ExpiredSignatureError as expired_error:
    #     print(f"Token expired: {expired_error}")
    #     return None
    # except InvalidTokenError as invalid_token_error:
    #     print(f"Invalid token: {invalid_token_error}")
    #     return None
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None


def genrate_jwt_token(username:str):
    access_token = (
        jwt.encode(
            {"sub": username, "exp": time.time() + 64800},
            SECRET_KEY,
            algorithm="HS256",
            
        ),
    )
    return access_token