# main.py
import hashlib
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session, make_transient
from models.db_session import DBSession
from models.base_md import User
import math
from datetime import timedelta, datetime
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder


import models.request_models as rqm
import models.base_md as bmd
import app.security as su
import dump_model as dm
import pickle
import pandas as pd
import numpy as np

pickle_in = open("Ensemble.pkl","rb")
classifier=pickle.load(pickle_in)

app = FastAPI()

origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Allow all origins
    allow_credentials=True,
    allow_methods=["*"], # Allow all methods
    allow_headers=["*"], # Allow all headers
)


def get_db():
    db = DBSession()
    try:
        yield db
    finally:
        db.close()

def user_is_admin(current_user_email = Depends(su.get_current_user), db: DBSession = Depends(get_db)):
    current_user = db.get_user_by_email(current_user_email)
    if current_user.is_admin == False:
        raise HTTPException(status_code=403, detail="User is not an admin")
    return current_user


def calculate_monthly_payment(loan_amount, interest_rate, loan_term):
    monthly_interest_rate = interest_rate / (12 * 100)
    total_payments = loan_term
    monthly_payment = (loan_amount * monthly_interest_rate) / (1 - math.pow((1 + monthly_interest_rate), -total_payments))
    return monthly_payment

def calculate_maturity_amount(principal, interest_rate, tenure):
    # Convert interest rate to decimal
    interest_rate_decimal = interest_rate / 100.0
    
    # Calculate periodic rate of interest
    periodic_interest_rate = interest_rate_decimal / 12.0
    
    # Calculate number of payments
    num_payments = tenure * 12
    
    # Calculate Maturity Amount
    maturity_amount = principal * ((pow(1 + periodic_interest_rate, num_payments) - 1) / periodic_interest_rate) * (1 + periodic_interest_rate)
    
    return maturity_amount

def update_loan_details(loan_id: int, loan_amount: float, annual_interest_rate: float, loan_term: int, db: DBSession = Depends(get_db)):
    loan_details = bmd.LoanDetails(
        loan_id=loan_id,
        loan_amount=loan_amount,
        annual_interest_rate=annual_interest_rate,
        loan_term=loan_term
    )
    db.add_to_session(loan_details)
    db.commit()

def calculate_total_return(principal, interest_rate, tenure):
    interest_rate_decimal = interest_rate / 100
    total_return = principal + principal * ((1 + interest_rate_decimal) ** tenure - 1)
    return total_return


@app.post("/signup")
async def signup(user_details: rqm.UserDetails, db: DBSession = Depends(get_db)):
    existing_user = db.get_user_by_phone_or_email(user_details.phone, user_details.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Phone or email already registered")

    hashed_password = hashlib.sha256(user_details.password.encode("utf-8")).hexdigest()
    new_user = User(
        name=user_details.name,
        phone=user_details.phone,
        email=user_details.email,
        gender=user_details.gender,
        pincode = user_details.pincode,
        state = user_details.state,
        address_detail = user_details.address_detail,
        password=hashed_password
        )
    db.add_to_session(new_user)
    db.commit()

    return {"message": "User successfully registered"}


@app.post("/login")
async def login(loginuser : rqm.LoginUser, db: DBSession = Depends(get_db)):
    response = {}
    user = db.get_user_by_email(loginuser.email)
    hashed_password = hashlib.sha256(loginuser.password.encode("utf-8")).hexdigest()
    if user and user.password == hashed_password:
        access_token = su.genrate_jwt_token(user.email)
        access_token = "".join(access_token)
        userdetails = su.get_current_user(access_token)
        response = {
           "message": {
                "access_token": access_token,
                "email": user.email,
                }
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
        raise HTTPException(status_code=401, detail="User not found")
    new_loan = bmd.Loan(
        user_id=user.id, 
        aadhar_no= loan_data.aadhar_no,
        pan_no= loan_data.pan_no,
        bank_details= loan_data.bank_details,
        account_no= loan_data.account_no,
        ifsc_code = loan_data.ifsc_code,
        loan_amount=loan_data.loan_amount, 
        loan_type=loan_data.loan_type, 
        annual_interest_rate=loan_data.annual_interest_rate, 
        loan_term=loan_data.loan_term, 
        employment_details=loan_data.employment_details,
    )
    db.add_to_session(new_loan)
    db.commit()

    return {"message": "Loan application submitted successfully"}


@app.get("/user_profile")
async def get_user_profile(
    current_user_email = Depends(su.get_current_user),
    db: DBSession = Depends(get_db)
    ):
    response = {}
    current_user = db.get_user_by_email(current_user_email)
    if not current_user:
        raise HTTPException(status_code=401, detail="User not found")
    response = {
        "message": {
        "user_id": current_user.id,
        "name": current_user.name, 
        "email": current_user.email, 
        "phone": current_user.phone,
        "gender": current_user.gender,
        "pincode": current_user.pincode,
        "state": current_user.state,
        "address_detail": current_user.address_detail,
        }
    }
    return response


@app.put("/update_profile")
async def update_user_profile(
    profile_data: rqm.UpdateUserProfile,
    current_user_email=Depends(su.get_current_user),
    db: DBSession = Depends(get_db)
):
    response = {}
    current_user = db.get_user_by_email(current_user_email)
    if not current_user:
        raise HTTPException(status_code=401, detail="User not found")
    if current_user:
        if current_user.name is not None:
            current_user.name = profile_data.name
        if current_user.gender is not None:
            current_user.gender = profile_data.gender
        if current_user.pincode is not None:
            current_user.pincode = profile_data.pincode
        if current_user.state is not None:
            current_user.state = profile_data.state
        if current_user.address_detail is not None:
            current_user.address_detail = profile_data.address_detail
        db.session.commit()
        db.session.refresh(current_user)
        response = {
            "message": {
            "user_id": current_user.id,
            "email": current_user.email,
            "name": current_user.name,
            "phone": current_user.phone,
            "gender": current_user.gender,
            "pincode": current_user.pincode,
            "state" : current_user.state,
            "address_detail": current_user.address_detail,
            }
        }
        return response
    else:
        raise HTTPException(status_code=404, detail="User not found")


@app.get("/loan/history")
async def get_loan_application_history(
    current_user_email=Depends(su.get_current_user),
    db: DBSession = Depends(get_db)
):
    response = {}
    current_user = db.get_user_by_email(current_user_email)
    if current_user or current_user.is_admin == True:
        loan_history = db.get_loan_history_by_user(current_user.id)
        if loan_history:
            return [
                {
                    "loan_id": loan.id,
                    "user_id": loan.user_id,
                    "name": loan.user.name,
                    "phone": loan.user.phone,
                    "email": loan.user.email,
                    "loan_amount": loan.loan_amount,
                    "loan_type": loan.loan_type,
                    "annual_interest_rate" : loan.annual_interest_rate,
                    "loan_term": loan.loan_term, 
                    "employment_details": loan.employment_details,
                    "status": loan.status,
                }
                for loan in loan_history
            ]
    else:
        raise HTTPException(status_code=401, detail="User not found")

    return []



@app.get("/loan/{loan_id}")
async def get_loan_details(
    loan_id: int,
    current_user_email=Depends(su.get_current_user),
    db: DBSession=Depends(get_db)
):
    current_user = db.get_user_by_email(current_user_email)
    loan = db.get_loan_by_id(loan_id)
    if loan: 
        if loan.user_id == current_user.id:
            response = {
                "message": { 
                "loan_id": loan.id,
                "user_id": loan.user_id,
                "name": loan.user.name,
                "phone": loan.user.phone,
                "email": loan.user.email,
                "gender": loan.user.gender,
                "pincode": loan.user.pincode,
                "state": loan.user.state,
                "address":loan.user.address_detail,
                "aadhar_no": loan.aadhar_no,
                "pan_no": loan.pan_no,
                "bank_details":loan.bank_details,
                "account_no": loan.account_no,
                "ifsc_code": loan.ifsc_code,
                "loan_amount": loan.loan_amount,
                "loan_type": loan.loan_type,
                "annual_interest_rate": loan.annual_interest_rate,
                "loan_term": loan.loan_term,
                "employment_details": loan.employment_details,
                "status": loan.status,
                }
            }
            return response
        else:
            raise HTTPException(status_code=401, detail="User not found")

    raise HTTPException(status_code=404, detail="Loan not found")

@app.put("/loan/update/{loan_id}")
async def update_loan_application(
    update_data: rqm.UpdateLoanApplication,
    loan_id: int,
    current_user_email=Depends(su.get_current_user),
    db: DBSession = Depends(get_db)
):
    current_user = db.get_user_by_email(current_user_email)

    if not current_user:
        raise HTTPException(status_code=401, detail="User not found")

    loan_to_update = db.get_loan_by_id(loan_id)

    if loan_to_update:
        if update_data.loan_amount is not None:
            loan_to_update.loan_amount = update_data.loan_amount
        if update_data.loan_type is not None:
            loan_to_update.loan_type = update_data.loan_type
        if update_data.employment_details is not None:
            loan_to_update.employment_details = update_data.employment_details
        if update_data.aadhar_no is not None:
            loan_to_update.aadhar_no = update_data.aadhar_no
        if update_data.pan_no is not None:
            loan_to_update.pan_no = update_data.pan_no
        if update_data.bank_details is not None:
            loan_to_update.bank_details = update_data.bank_details
        if update_data.account_no is not None:
            loan_to_update.account_no = update_data.account_no
        db.session.commit()
        db.session.refresh(loan_to_update)

        
        return {
            "loan_id": loan_to_update.id,
            "user_id": loan_to_update.user_id,
            "loan_amount": loan_to_update.loan_amount,
            "loan_type": loan_to_update.loan_type,
            "loan_term": loan_to_update.loan_term, 
            "employment_details": loan_to_update.employment_details,
        }
    else:
        raise HTTPException(status_code=404, detail="Loan not found")


def calculate_total_repayment(monthly_payment, loan_term):
    return monthly_payment * loan_term

@app.post("/loan/fdcalculate")
async def calculate_loan(
    loan_details: rqm.FDCalculation,
    current_user_email = Depends(su.get_current_user),
    db: DBSession = Depends(get_db)
):
    current_user = db.get_user_by_email(current_user_email)
    if not current_user:
        raise HTTPException(status_code=401, detail="User not found")
    try:
        total_return = calculate_total_return( loan_details.principal, loan_details.interest_rate, loan_details.tenure)
        return { "principal":loan_details.principal,
                 "estimatate_return": round((round(total_return, 2)-loan_details.principal),2),
                 "total_return": round(total_return, 2),
                }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/loan/calculate")
async def calculate_loan(
    loan_details: rqm.LoanCalculationDetails,
    current_user_email = Depends(su.get_current_user),
    db: DBSession = Depends(get_db)
):

    current_user = db.get_user_by_email(current_user_email)
    if not current_user:
        raise HTTPException(status_code=401, detail="User not found")
    try:
        monthly_payment = calculate_monthly_payment(loan_details.loan_amount, loan_details.annual_interest_rate, loan_details.loan_term)
        total_repayment = calculate_total_repayment(monthly_payment, loan_details.loan_term)
        return { "principal":loan_details.loan_amount,
                 "monthly_payment": round(monthly_payment, 2),
                 "total_repayment": round(total_repayment, 2),
                 "interest": round((round(total_repayment, 2)-loan_details.loan_amount),2)
                 }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@app.post("/loan/fdcalculate")
async def calculate_loan(
    loan_details: rqm.FDCalculation,
    current_user_email = Depends(su.get_current_user),
    db: DBSession = Depends(get_db)
):

    current_user = db.get_user_by_email(current_user_email)
    if not current_user:
        raise HTTPException(status_code=401, detail="User not found")
    try:
        total_return = calculate_total_return( loan_details.principal, loan_details.interest_rate, loan_details.tenure)
        print(total_return)
        return { "principal":loan_details.principal,
                 "estimatate_return": (round(total_return, 2)-loan_details.principal),
                 "total_return": round(total_return, 2),
                }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/loan/sipcalculate")
async def calculate_loan(
    loan_details: rqm.FDCalculation,
    current_user_email = Depends(su.get_current_user),
    db: DBSession = Depends(get_db)
):

    current_user = db.get_user_by_email(current_user_email)
    if not current_user:
        raise HTTPException(status_code=401, detail="User not found")
    try:
        total_return = calculate_maturity_amount( loan_details.principal, loan_details.interest_rate, loan_details.tenure)
        print(total_return)
        return { "principal":(loan_details.principal*loan_details.tenure*12),
                 "estimatate_return": (round(total_return, 2)-(loan_details.principal*loan_details.tenure*12)),
                 "total_return": round(total_return, 2),
                }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@app.get("/loan/{loan_id}/repayment-schedule")
async def get_repayment_schedule(
    loan_id: int,
    current_user_email = Depends(su.get_current_user),
    db: DBSession = Depends(get_db)
    ):

    current_user = db.get_user_by_email(current_user_email)
    if not current_user:
        raise HTTPException(status_code=401, detail="User not found")

    loan = db.get_loan_by_id(loan_id)
    if not loan:
        raise HTTPException(status_code=404, detail="Loan not found")

    principal = loan.loan_amount
    annual_interest_rate = loan.annual_interest_rate / 100 
    monthly_interest_rate = annual_interest_rate / 12
    monthly_payment = calculate_monthly_payment(loan.loan_amount, loan.annual_interest_rate,loan.loan_term)
    total_repayment = calculate_total_repayment(monthly_payment, loan.loan_term)
    print(monthly_payment)
    print(total_repayment)
    repayment_schedule = []
    balance = principal
    for month in range(1, 10):
        interest = balance * monthly_interest_rate
        total_repayment -= monthly_payment 
        balance -= monthly_payment
        due_date = datetime.now() + timedelta(days=month*30) 
        repayment_schedule.append({
            "month": month,
            "due_date": due_date.strftime('%Y-%m-%d'),
            "principal": monthly_payment,
            "interest": interest,
            "total_payment": monthly_payment*month,
            "balance": balance
        })

    return {"repayment_schedule": repayment_schedule}

@app.post("/predict")
async def predict_loan_approval(data: rqm.LoanData):
    input_data = data.model_dump()
    #return input_data

    input_list = [
        input_data['Gender'],
        input_data['Married'],
        input_data['Dependents'],
        input_data['Education'],
        input_data['Self_Employed'],
        input_data['ApplicantIncome'],
        input_data['CoapplicantIncome'],
        input_data['LoanAmount'],
        input_data['Loan_Amount_Term'],
        input_data['Credit_History'],
        input_data['Rural'],
        input_data['Semiurban'],
        input_data['Urban']
    ]

    #return input_list
    # dm.dump_model()
    # return {}

    # Convert the list into a NumPy array and reshape it to match the expected input shape of the classifier
    input_array = np.array(input_list).reshape(1, -1)

    prediction = classifier.predict(input_array)
    print(prediction)
    if prediction[0] == 1:
        return {"prediction": "Loan will be approved"}
    else:
        return {"prediction": "Loan will not be approved"}  
    

@app.put("/loan/{loan_id}/approve")
async def approve_loan_application(
    loan_id: int,
    current_user_email = Depends(su.get_current_user),
    db: DBSession = Depends(get_db)
):
    response = {}
    user = db.get_user_by_email(current_user_email)
    if not user.is_admin:
        raise HTTPException(status_code=401, detail="User not found")
    loan_to_approve = db.get_loan_by_id(loan_id)
    if loan_to_approve:
        # if loan_to_approve not in db.session:
        #     db.session.add(loan_to_approve)
        if loan_to_approve.status == "pending":
            loan_to_approve.status = "approved"
            db.session.commit()
            # loan_to_approve = db.get_loan_by_id(loan_id)
            # db.session.refresh(loan_to_approve)
            # update_loan_details(loan_id, loan_to_approve.loan_amount, loan_to_approve.annual_interest_rate, loan_to_approve.loan_term, db)
            response= {
                "message": {
                "loan_id": loan_to_approve.id,
                "user_id": loan_to_approve.user_id,
                "status": loan_to_approve.status,
                }
            }
        else:
            raise ValueError("Loan is either already accepted or rejected")
        
    else:
        raise HTTPException(status_code=404, detail="Loan not found")
    return response
    

@app.put("/loan/{loan_id}/reject")
async def reject_loan_application(
    loan_id: int,
    current_user_email = Depends(su.get_current_user),
    db: DBSession = Depends(get_db)
):
    user = db.get_user_by_email(current_user_email)
    if not user.is_admin:
        raise HTTPException(status_code=401, detail="User not found")
    loan_to_reject = db.get_loan_by_id(loan_id)

    if loan_to_reject:
        if loan_to_reject.status == "pending":
            loan_to_reject.status = "rejected"
            db.session.commit()
            db.session.refresh(loan_to_reject)

            return {
                "loan_id": loan_to_reject.id,
                "user_id": loan_to_reject.user_id,
                "status": loan_to_reject.status,
            }
        else:
            raise ValueError("Loan is either already accepted or rejected")
    else:
        raise HTTPException(status_code=404, detail="Loan not found")


@app.post("/all_users_profile_pg")
async def get_all_users_profile(
    users_profile_req: rqm.UsersProfileReq,
    current_user_email = Depends(su.get_current_user),
    db: DBSession = Depends(get_db)
):
    response = {}
    user = db.get_user_by_email(current_user_email)
    if not user.is_admin:
        raise HTTPException(status_code=401, detail="User not found")
    user_details = db.get_users_profile_with_pagination(
        users_profile_req.sort_by,
        users_profile_req.sort_order,
        users_profile_req.page_no,
        users_profile_req.limit
    )
    response = user_details
    return response 

@app.post("/all_loan_history_pg")
async def all_loan_history_pg(
    loan_history_req: rqm.LoanHistoryReq,
    current_user_email = Depends(su.get_current_user),
    db: DBSession = Depends(get_db)
):
    response = {}
    user = db.get_user_by_email(current_user_email)
    if not user.is_admin:
        raise HTTPException(status_code=401, detail="User not found")
    loan_history = db.get_loan_history_with_pagination(
        loan_history_req.sort_by,
        loan_history_req.sort_order,
        loan_history_req.page_no,
        loan_history_req.limit
    )
    response = loan_history
    return response


@app.get("/user_loan_history/{user_id}")
async def get_loan_application_history(
    user_id: int,
    current_user_email=Depends(su.get_current_user),
    db: DBSession = Depends(get_db)
):
    response = {}
    user = db.get_user_by_id(user_id)
    admin = db.get_user_by_email(current_user_email)
    if not admin.is_admin:
        raise HTTPException(status_code=401, detail="User not found")
    loan_history = db.get_loan_history_by_user(user.id)
    if loan_history:
        return [
            {
                "loan_id": loan.id,                  
                "user_id": loan.user_id,
                "name": loan.user.name,
                "phone": loan.user.phone,
                "email": loan.user.email,
                "loan_amount": loan.loan_amount,
                "loan_type": loan.loan_type,
                "annual_interest_rate" : loan.annual_interest_rate,
                "loan_term": loan.loan_term, 
                "employment_details": loan.employment_details,
                "status": loan.status,
            }
            for loan in loan_history
        ]
    else:
        raise HTTPException(status_code=401, detail="User not found")


    
