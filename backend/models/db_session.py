from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
import os
from models.base_md import Base 

# km _financial import
from core.db import get_session, get_engine

class DBSession:
    def __init__(self):
        # self.database_uri = os.getenv('DATABASE_URI')
        self.database_uri='sqlite:///mydatabase.db'
        self.session: Session = get_session(self.database_uri)
        self.engine =get_engine(self.database_uri)
        

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

