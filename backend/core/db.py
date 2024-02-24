from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


def get_session(database_uri):
    """Create a database session."""
    engine = create_engine(database_uri)
    Session = sessionmaker(autocommit=False, autoflush=True, bind=engine)
    
    session =Session()
    return session

def get_engine(database_uri):
    engine = create_engine(database_uri)
    return engine



