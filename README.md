# km_financial #

### Required Installation ###

```
    pip install fastapi uvicorn sqlalchemy
    pip install jwt
    pip install passlib
    pip install python-multipart
    pip install timedelta
    python.exe -m pip install --upgrade pip
```

### Required Setup ###

1. Create a virtual env 
```
    phython -m venv env
```

2. Open env setup in command prompt
```
    env\Scripts\activate.bat
```

3. Open env setup in powershell
```
    env\Scripts\Activate.ps1
```

4. Toexit from env setup
```
    exit
```

### For running Backend ###
```
    uvicorn main:app --reload
```

