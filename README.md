# km_financial #

### Required Installation ###

```
    pip install fastapi uvicorn sqlalchemy
    pip install PyJWT pandas passlib timedelta
    pip install python-multipart
    pip install scikit-learn==1.3.2
    python.exe -m pip install --upgrade pip
    npm install axiom axios
    npm install path-browserify browserify-fs
```

### Required Setup ###

1. Create a virtual env 
```
    python -m venv env
```

2. Open env setup in command prompt
```
    env\Scripts\activate.bat
```

3. To exit from env setup
```
    exit
```

### For running Backend ###
```
    uvicorn main:app --reload
```

