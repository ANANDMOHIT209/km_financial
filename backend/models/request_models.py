from dataclasses import dataclass
from typing import List, Optional, Union, Dict
import pydantic

from pydantic import BaseModel

class ClientReq(BaseModel):
    source: Union[str, None] = None
    ttl: Optional[int] = None

class UserDetails(ClientReq):
    name: str
    phone: str
    email: str
    password: str

class UpdateUserProfile(ClientReq):
    name: Optional[str] = None

class LoginUser(ClientReq):
    email:str
    password:str

class LoanCalculationDetails(BaseModel):
    loan_amount: float
    annual_interest_rate: float
    loan_term: int 

class LoanApplication(LoanCalculationDetails, ClientReq):
    loan_amount: float
    loan_type: str
    employment_details: str
    aadhar_no: str
    pan_no: str
    bank_details: str
    account_no: str
    ifsc_code: str

class UpdateLoanApplication(ClientReq):
    loan_amount: Optional[float] = None
    loan_type: Optional[str] = None
    loan_term: Optional[int] = None
    employment_details: Optional[str] = None
    aadhar_no: Optional[str] = None
    pan_no: Optional[str] = None
    bank_details: Optional[str] = None
    account_no: Optional[str] = None

class LoanData(BaseModel):
    Gender: int
    Married: int
    Dependents: int
    Education: int
    Self_Employed: int
    ApplicantIncome: int
    CoapplicantIncome: int
    LoanAmount: int
    Loan_Amount_Term: int
    Credit_History: int
    Rural: int
    Semiurban: int
    Urban: int



    