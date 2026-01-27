import os
import requests
import pandas as pd
from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import time

load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
engine = create_engine(DATABASE_URL)

def clean_nested_list(item_list):
    if not item_list:
        return None
    return ", ".join([item['name'] for item in item_list])

def fetch_and_load_anime():
    all_records = []
    
    for page in range(1, 11):
        print(f"Fetching page {page}...")
        api_url = f"https://api.jikan.moe/v4/top/anime?page={page}"
        response = requests.get(api_url)
    
        if response.status_code == 200:
            data = response.json()['data']

            for item in data:
                display_title = next((t['title'] for t in item['titles'] if t['type'] == 'Default'), item.get('title'))

                record = {
                    'mal_id': item.get('mal_id'),
                    'title': display_title,
                    'type': item.get('type'),
                    'source': item.get('source'),
                    'episodes': item.get('episodes'),
                    'status': item.get('status'),
                    'year': item.get('year'),
                    'season': item.get('season'),
                    'aired_from': item.get('aired', {}).get('from'), 
                    'rating': item.get('rating'),
                    'score': item.get('score'),
                    'scored_by': item.get('scored_by'),
                    'rank': item.get('rank'),
                    'popularity': item.get('popularity'),
                    'members': item.get('members'),
                    'favorites': item.get('favorites'),
                    'synopsis': item.get('synopsis'),
                    'image_url': item.get('images', {}).get('jpg', {}).get('image_url'),
                    'studios': clean_nested_list(item.get('studios')),
                    'genres': clean_nested_list(item.get('genres')),
                    'themes': clean_nested_list(item.get('themes')),
                    'demographics': clean_nested_list(item.get('demographics'))
                }
                all_records.append(record)
            
            time.sleep(1)
        else:
            print(f"Error on page {page}: {response.status_code}")
            break
    
    if all_records:
        df = pd.DataFrame(all_records)
        
        # main method, table exists and is being updated
        load_method = 'append'
        try:
            with engine.begin() as conn:
                conn.execute(text("TRUNCATE TABLE raw_top_anime CASCADE;"))
                print("Table found. Truncating data.")
                
        except Exception:
            # this will catch any first run, where there is no table, and create the first table.
            print("No table found, creating.")
            load_method = 'replace'
        
        with engine.begin() as conn:
            df.to_sql('raw_top_anime', conn, if_exists=load_method, index=False)
            
        print(f"Success! {len(df)} anime loaded into 'raw_top_anime' table.")

if __name__ == "__main__":
    fetch_and_load_anime()