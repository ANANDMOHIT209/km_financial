from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
import os

# km _financial import
from core.db import get_session, get_engine
from models.base_md import Base, User

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

    def get_user_by_username(self, username: str):
        return self.session.query(User).filter(User.username == username).first()

    def get_user_by_email(self, email: str):
        return self.session.query(User).filter(User.email == email).first()

    def get_user_by_username_or_email(self, username: str, email: str):
        return (
            self.session.query(User)
            .filter((User.username == username) | (User.email == email))
            .first()
        )
    
    def get_user_by_id(self, user_id: int):
        return self.session.query(User).filter(User.id == user_id).first()


