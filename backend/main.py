# main.py
from fastapi import FastAPI
from models.db_session import DBSession
from models.base_md import User, Base

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}






