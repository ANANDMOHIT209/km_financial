# Setting Up km_financial #

### Prerequisites ###

Before getting started, make sure you have Python and Node.js installed on your system.

### Step 1: Install Required Packages ###

Open your command prompt or terminal and run the following commands to install the necessary Python packages:

```bash
pip install fastapi uvicorn sqlalchemy PyJWT pandas passlib timedelta python-multipart scikit-learn==1.3.2
python -m pip install --upgrade pip
```

Then, install the required Node.js packages:

```bash
npm install axiom axios path-browserify browserify-fs
```

### Step 2: Create a Virtual Environment ###

Navigate to your project directory in the command prompt or terminal and create a virtual environment by running:

```bash
python -m venv env
```

### Step 3: Activate the Virtual Environment ###

Activate the virtual environment by running the appropriate script based on your operating system:

- For Windows:

```bash
env\Scripts\activate.bat
```

- For macOS/Linux:

```bash
source env/bin/activate
```

### Step 4: Run the Backend ###

Finally, start the backend server by running:

```bash
uvicorn main:app --reload
```

Now, you're all set to run and develop the km_financial application! When you're finished, you can exit the virtual environment by running:

```bash
deactivate
```
