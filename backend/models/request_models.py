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

class UpdateLoanApplication(ClientReq):
    loan_amount: Optional[float] = None
    loan_type: Optional[str] = None
    loan_term: Optional[int] = None
    employment_details: Optional[str] = None



    