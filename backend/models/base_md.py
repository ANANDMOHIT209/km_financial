from sqlalchemy import create_engine, Column, Integer, String
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
    
