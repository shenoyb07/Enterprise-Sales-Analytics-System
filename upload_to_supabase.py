import pandas as pd
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

DB_URL = os.getenv("DB_URL")
if not DB_URL:
    print("❌ ERROR: DB_URL not found in .env file.")
    exit(1)

# These paths are set to "root" because that's where your 'ls' showed them
tables = [
    {'name': 'regions', 'file': 'regions.csv'},
    {'name': 'sales_reps', 'file': 'sales_reps.csv'},
    {'name': 'customers', 'file': 'customers.csv'},
    {'name': 'products', 'file': 'products.csv'},
    {'name': 'sales_orders', 'file': 'sales_orders.csv'},
    {'name': 'order_items', 'file': 'order_items.csv'}
]

def upload():
    try:
        print("Connecting to Supabase...")
        engine = create_engine(DB_URL)
        for table in tables:
            print(f"Uploading {table['name']}...")
            if os.path.exists(table['file']):
                df = pd.read_csv(table['file'])
                df.to_sql(table['name'], engine, if_exists='append', index=False)
                print(f"✅ {table['name']} uploaded successfully.")
            else:
                print(f"❌ File not found: {table['file']}")
        print("\n🚀 SUCCESS: Data is live in Supabase!")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    upload()