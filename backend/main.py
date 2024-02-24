# main.py
import hashlib
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from models.db_session import DBSession
from models.base_md import User

import models.request_models as rqm
from app.security import create_access_token

app = FastAPI()

# Dependency to get the database session
def get_db():
    db = DBSession()
    try:
        yield db
    finally:
        db.close()

@app.post("/signup")
async def signup(user_details: rqm.UserDetails, db: DBSession = Depends(get_db)):
    existing_user = db.get_user_by_username_or_email(user_details.username, user_details.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Username or email already registered")

    hashed_password = hashlib.sha256(user_details.password.encode("utf-8")).hexdigest()
    new_user = User(username=user_details.username, email=user_details.email, password=hashed_password)
    db.add_to_session(new_user)
    db.commit()

    return {"message": "User successfully registered"}


@app.post("/login")
async def login(loginuser : rqm.LoginUser, db: DBSession = Depends(get_db)):
    user = db.get_user_by_username(loginuser.username)
    hashed_password = hashlib.sha256(loginuser.password.encode("utf-8")).hexdigest()
    if user and user.password == hashed_password:
        response ={
            "access_token": create_access_token(data={"sub": user.username}),
            "user_details": loginuser.username
        }
        return response
    raise HTTPException(status_code=401, detail="Invalid credentials")




