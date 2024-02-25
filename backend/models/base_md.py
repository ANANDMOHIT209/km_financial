from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()



class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String, index=True)
    phone = Column(String, index=True, unique=True)
    email = Column(String, index=True, unique=True)
    password = Column(String)


class Loan(Base):
    __tablename__ = 'loans'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), index=True)
    name = Column(String, index=True)
    phone = Column(String, unique=True)
    email = Column(String, unique=True)
    loan_amount = Column(Float, index=True)
    loan_type = Column(String, index=True)
    employment_details = Column(String)
    
