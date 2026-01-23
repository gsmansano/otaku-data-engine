import os
from sqlalchemy import create_engine
from dotenv import load_dotenv

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
        with engine.connect() as conn:
            print("Successfully connected to the PostgreSQL database!")
    except Exception as e:
        print(f"Failed to connect: {e}")

test_db_connection()
print("--- DB Test Script Finished ---")