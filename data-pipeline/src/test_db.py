import os
from sqlalchemy import create_engine
from dotenv import load_dotenv

# Force print to see if script even starts
print("--- DB Test Script Started ---")

load_dotenv()

def test_db_connection():
    print("Attempting to load credentials...")
    user = os.getenv("DB_USER")
    pw = os.getenv("DB_PASSWORD")
    host = os.getenv("DB_HOST")
    port = os.getenv("DB_PORT")
    db = os.getenv("DB_NAME")

    print(f"Connecting to {db} at {host}...")
    connection_string = f"postgresql://{user}:{pw}@{host}:{port}/{db}"
    
    try:
        engine = create_engine(connection_string)
        # The 'with' block ensures the connection closes automatically
        with engine.connect() as conn:
            print("Successfully connected to the PostgreSQL database!")
    except Exception as e:
        print(f"Failed to connect: {e}")

# Call the function directly to ensure it runs
test_db_connection()
print("--- DB Test Script Finished ---")