from sqlalchemy import create_engine, Column, Integer, String, BOOLEAN, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship


Base = declarative_base()


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String, index=True)
    phone = Column(String, index=True, unique=True)
    email = Column(String, index=True, unique=True)
    gender =Column(String, index=True)
    pincode = Column(String, index =True)
    state = Column(String, index=True)
    address_detail = Column(String,index=True)
    is_admin = Column(BOOLEAN, default=True) 
    password = Column(String)
    loans = relationship("Loan", back_populates="user")


class Loan(Base):
    __tablename__ = 'loans'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), index=True)
    # name = Column(String, index=True)
    # phone = Column(String, index=True)
    # email = Column(String, index=True)
    aadhar_no = Column(String, index=True)
    pan_no = Column(String, index=True)
    bank_details = Column(String, index=True)
    account_no = Column(String, index=True)
    ifsc_code = Column(String, index = True)
    loan_amount = Column(Float, index=True)
    loan_type = Column(String, index=True)
    annual_interest_rate = Column(Float, index=True)
    loan_term = Column(Integer, index=True)
    employment_details = Column(String)
    status = Column(String, default="pending")

    user = relationship("User", back_populates="loans") # Added relationship definition
    details = relationship("LoanDetails", back_populates="loan", uselist=False)


class LoanDetails(Base):
    __tablename__ = 'loan_details'
    id = Column(Integer, primary_key=True, index=True)
    loan_id = Column(Integer, ForeignKey('loans.id'), index=True)
    loan_amount = Column(Float, index=True)
    annual_interest_rate = Column(Float, index=True)
    loan_term = Column(Integer, index=True)

    loan = relationship("Loan", back_populates="details", uselist=False)


    
