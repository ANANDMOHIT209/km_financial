from dataclasses import dataclass
from typing import List, Optional, Union, Dict
import pydantic

from pydantic import BaseModel

class ClientReq(BaseModel):
    source: Union[str, None] = None
    ttl: Optional[int] = None

class UserDetails(ClientReq):
    username: str
    email: str
    password: Optional[str] = None

class LoginUser(ClientReq):
    username:str
    password:str