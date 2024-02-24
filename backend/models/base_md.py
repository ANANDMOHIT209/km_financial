from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()



class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, index=True, unique=True)
    password = Column(String)

    def __repr__(self):
        return f"<User(name={self.username}, email={self.email})>"
    
class Loan(Base):
    __tablename__ = 'loans'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), index=True)
    loan_amount = Column(Float)
    loan_type = Column(String)
    employment_details = Column(String)
    
