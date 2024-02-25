from sqlalchemy import create_engine, Column, Integer, String, BOOLEAN, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()



class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String, index=True)
    phone = Column(String, index=True, unique=True)
    email = Column(String, index=True, unique=True)
    is_admin = Column(BOOLEAN, default=False) 
    password = Column(String)


class Loan(Base):
    __tablename__ = 'loans'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), index=True)
    name = Column(String, index=True)
    phone = Column(String, index=True)
    email = Column(String, index=True)
    loan_amount = Column(Float, index=True)
    loan_type = Column(String, index=True)
    employment_details = Column(String)
    status = Column(String, default="pending")
    
