import requests
import sys

print("--- Script Starting ---")

def test_jikan():
    url = "https://api.jikan.moe/v4/top/anime"
    try:
        print(f"Connecting to: {url}...")
        response = requests.get(url, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            # Jikan returns a list under the 'data' key
            top_anime = data['data'][0]['title']
            print(f"SUCCESS! The top anime is: {top_anime}")
        else:
            print(f"API Error: Status {response.status_code}")
            
    except Exception as e:
        print(f"Connection Error: {e}")

if __name__ == "__main__":
    test_jikan()
    print("--- Script Finished ---")