import os
import requests
import pandas as pd
from sqlalchemy import create_engine
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
                display_title = next((t['title'] for t in item['titles'] if t['type'] == 'Default'), item['title'])

                record = {
                    'mal_id': item['mal_id'],
                    'title': display_title,
                    'type': item['type'],
                    'source': item['source'],
                    'episodes': item['episodes'],
                    'status': item['status'],   
                    'year': item['year'],
                    'score': item['score'],
                    'scored_by': item['scored_by'],
                    'rank': item['rank'],
                    'popularity': item['popularity'],
                    'members': item['members'],
                    'favorites': item['favorites'],
                    'studios': clean_nested_list(item['studios']),
                    'genres': clean_nested_list(item['genres']),
                    'themes': clean_nested_list(item['themes'])
                }
                all_records.append(record)
            
            time.sleep(1)
        else:
            print(f"Error on page {page}: {response.status_code}")
            break
    
    if all_records:
        df = pd.DataFrame(all_records)
        df.to_sql('raw_top_anime', engine, if_exists='replace', index=False)
        print(f"Success! {len(df)} anime loaded into 'raw_top_anime' table.")

if __name__ == "__main__":
    fetch_and_load_anime()