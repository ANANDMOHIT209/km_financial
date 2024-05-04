from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, Session
import os
from fastapi.encoders import jsonable_encoder

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
    
    def get_user_by_id(self, id: int):
        return self.session.query(User).filter(User.id == id).first()

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
    
    def get_loan_history_by_user(self, user_id: int):
        return (
            self.session.query(Loan)
            .filter((Loan.user_id == user_id))
            .all()
        )
    
    def get_users_profile_with_pagination(
            self,
            sort_by = "id",
            sort_order = "desc",
            page_no = 0,
            limit = 50
    ):
        if limit ==0:
            limit=50
        if sort_by == "":
            sort_by = "id"
        if sort_order == "":
            sort_order = "desc"
        skip = page_no*limit
        users_profile = {}
        count = 0
        query = (
            self.session.query(User)
        )
        count = query.count()
        query = (
            query.order_by(text(f"{sort_by} {sort_order}"))
            .offset(skip)
            .limit(limit)
        )
        users = query.all()
        pages = int(count/limit) if (count%limit==0) else int(count/limit+1)
        users_profile = jsonable_encoder(users)
        response = {
            "users": users_profile,
            "count": count,
            "limit": limit,
            "total_pages": pages,
            "sort_by": sort_by,
            "sort_order": sort_order
        }
        return response

    def get_loan_history_with_pagination(
            self,
            sort_by = "id",
            sort_order = "desc",
            page_no = 0,
            limit = 50
    ):
        if limit ==0:
            limit=50
        if sort_by == "":
            sort_by = "id"
        if sort_order == "":
            sort_order = "desc"
        skip = page_no*limit
        loan_history = {}
        count = 0
        query = (
            self.session.query(Loan)
        )
        count = query.count()
        query = (
            query.order_by(text(f"{sort_by} {sort_order}"))
            .offset(skip)
            .limit(limit)
        )
        loans = query.all()
        pages = int(count/limit) if (count%limit==0) else int(count/limit+1)
        loan_history = jsonable_encoder(loans)
        response = {
            "loans": loan_history,
            "count": count,
            "limit": limit,
            "total_pages": pages,
            "sort_by": sort_by,
            "sort_order": sort_order
        }
        return response
