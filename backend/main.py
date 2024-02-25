# main.py
import hashlib
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session, make_transient
from models.db_session import DBSession
from models.base_md import User

import models.request_models as rqm
import models.base_md as bmd
import app.security as su

app = FastAPI()


def get_db():
    db = DBSession()
    try:
        yield db
    finally:
        db.close()


@app.post("/signup")
async def signup(user_details: rqm.UserDetails, db: DBSession = Depends(get_db)):
    existing_user = db.get_user_by_phone_or_email(user_details.phone, user_details.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Phone or email already registered")

    hashed_password = hashlib.sha256(user_details.password.encode("utf-8")).hexdigest()
    new_user = User(name=user_details.name, phone=user_details.phone,  email=user_details.email, password=hashed_password)
    db.add_to_session(new_user)
    db.commit()

    return {"message": "User successfully registered"}


@app.post("/login")
async def login(loginuser : rqm.LoginUser, db: DBSession = Depends(get_db)):
    user = db.get_user_by_email(loginuser.email)
    hashed_password = hashlib.sha256(loginuser.password.encode("utf-8")).hexdigest()
    if user and user.password == hashed_password:
        access_token = su.genrate_jwt_token(user.email)
        access_token = "".join(access_token)
        userdetails = su.get_current_user(access_token)
        response = {
            "access_token": access_token,
            "email": user.email,
            "userdetails": userdetails,
        }
        return response
    raise HTTPException(status_code=401, detail="Invalid credentials")


@app.post("/apply-loan")
async def apply_loan(
    loan_data: rqm.LoanApplication,
    current_user_email = Depends(su.get_current_user),
    db: DBSession = Depends(get_db)
):
    user = db.get_user_by_email(current_user_email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    new_loan = bmd.Loan(user_id=user.id, name=user.name, phone=user.phone, email=user.email, loan_amount=loan_data.loan_amount, loan_type=loan_data.loan_type, employment_details=loan_data.employment_details)
    db.add_to_session(new_loan)
    db.commit()

    return {"message": "Loan application submitted successfully"}


@app.get("/user_profile")
async def get_user_profile(
    current_user_email = Depends(su.get_current_user),
    db: DBSession = Depends(get_db)
    ):
    current_user = db.get_user_by_email(current_user_email)
    return {
        "user_id": current_user.id,
        "name": current_user.name, 
        "email": current_user.email, 
        "phone": current_user.phone,
    }


@app.put("/update_profile")
async def update_user_profile(
    profile_data: rqm.UpdateUserProfile,
    current_user_email=Depends(su.get_current_user),
    db: DBSession = Depends(get_db)
):
    current_user = db.get_user_by_email(current_user_email)

    if current_user:
        if current_user.name is not None:
            current_user.name = profile_data.name
        db.session.commit()
        db.session.refresh(current_user)
        return {
            "user_id": current_user.id,
            "email": current_user.email,
            "name": current_user.name,
            "phone": current_user.phone,
        }
    else:
        raise HTTPException(status_code=404, detail="User not found")


@app.get("/loan/history/{user_id}")
async def get_loan_application_history(
    user_id: int,
    current_user_email=Depends(su.get_current_user),
    db: DBSession = Depends(get_db)
):
    current_user = db.get_user_by_email(current_user_email)
    if current_user:
        loan_history = db.get_loan_history_by_user(user_id)
        if loan_history:
            return [
                {
                    "loan_id": loan.id,
                    "user_id": loan.user_id,
                    "name": loan.name,
                    "phone": loan.phone,
                    "email": loan.email,
                    "loan_amount": loan.loan_amount,
                    "loan_type": loan.loan_type,
                    "employment_details": loan.employment_details,
                }
                for loan in loan_history
            ]

    return []


@app.get("/loan/{loan_id}")
async def get_loan_details(
    loan_id: int,
    current_user_email = Depends(su.get_current_user),
    db: DBSession = Depends(get_db)
):
    current_user = db.get_user_by_email(current_user_email)
    loan = db.get_loan_by_id(loan_id)

    if loan:
        if loan.user_id != current_user.id:
            raise HTTPException(status_code=404, detail="You don't have permission to access this loan.")

        return {
            "loan_id": loan.id,
            "user_id": loan.user_id,
            "name": loan.name,
            "phone": loan.phone,
            "email": loan.email,
            "loan_amount": loan.loan_amount,
            "loan_type": loan.loan_type,
            "employment_details": loan.employment_details,
        }

    raise HTTPException(status_code=404, detail="Loan not found")


@app.put("/loan/update/{loan_id}")
async def update_loan_application(
    update_data: rqm.UpdateLoanApplication,
    loan_id: int,
    current_user_email=Depends(su.get_current_user),
    db: DBSession = Depends(get_db)
):
    current_user = db.get_user_by_email(current_user_email)

    loan_to_update = db.get_loan_by_id(loan_id)

    if loan_to_update:
        if update_data.loan_amount is not None:
            loan_to_update.loan_amount = update_data.loan_amount
        if update_data.loan_type is not None:
            loan_to_update.loan_type = update_data.loan_type
        if update_data.employment_details is not None:
            loan_to_update.employment_details = update_data.employment_details
        db.session.commit()
        db.session.refresh(loan_to_update)

        
        return {
            "loan_id": loan_to_update.id,
            "user_id": loan_to_update.user_id,
            "loan_amount": loan_to_update.loan_amount,
            "loan_type": loan_to_update.loan_type,
            "employment_details": loan_to_update.employment_details,
        }
    else:
        raise HTTPException(status_code=404, detail="Loan not found")

