# main.py
import hashlib
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from models.db_session import DBSession
from models.base_md import User

import models.request_models as rqm
import models.base_md as bmd
import app.security as su

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
        access_token = su.genrate_jwt_token(user.username)
        access_token = "".join(access_token)
        userdetails = su.get_current_user(access_token)
        response = {
            "access_token": access_token,
            "username": user.username,
            "userdetails": userdetails,
        }
        return response
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.post("/apply-loan")
async def apply_loan(
    loan_data: rqm.LoanApplication,
    user_name = Depends(su.get_current_user),
    db: DBSession = Depends(get_db)
):
    user = db.get_user_by_username(user_name)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    new_loan = bmd.Loan(user_id=user.id, loan_amount=loan_data.loan_amount, loan_type=loan_data.loan_type, employment_details=loan_data.employment_details)
    db.add_to_session(new_loan)
    db.commit()

    return {"message": "Loan application submitted successfully"}




