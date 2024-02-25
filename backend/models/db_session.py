from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
import os

# km _financial import
from core.db import get_session, get_engine
from models.base_md import Base, User, Loan

class DBSession:
    def __init__(self):
        self.database_uri = 'sqlite:///mydatabase.db'
        self.session: Session = get_session(self.database_uri)
        self.engine = get_engine(self.database_uri)
        self.create_tables()

    def create_tables(self):
        # Base.metadata.drop_all(self.engine)
        Base.metadata.create_all(self.engine)

    def add_to_session(self, item):
        Base.metadata.create_all(self.engine)
        self.session.add(item)
        self.session.flush()
        self.session.refresh(item)

    def commit(self,commit=True):
        if commit:
            self.session.commit()
        self.session.close()

    def close(self):
        self.session.close()

    def get_user_by_phone(self, phone: str):
        return self.session.query(User).filter(User.phone == phone).first()

    def get_user_by_email(self, email: str):
        return self.session.query(User).filter(User.email == email).first()

    def get_user_by_phone_or_email(self, phone: str, email: str):
        return (
            self.session.query(User)
            .filter((User.phone == phone) | (User.email == email))
            .first()
        )
    
    def get_user_by_id(self, user_id: int):
        return self.session.query(User).filter(User.id == user_id).first()
    
    def get_loan_by_id(self,loan_id: int):
        return (
            self.session.query(Loan)
            .filter((Loan.id == loan_id))
            .first()
        )


