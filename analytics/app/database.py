from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB connection
MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/quicktask')

try:
    client = MongoClient(MONGODB_URI)
    db = client.get_database()
    
    # Test connection
    client.admin.command('ping')
    print("SUCCESS: Connected to MongoDB!")
except Exception as e:
    print(f"ERROR: MongoDB connection failed: {e}")
    raise e

# Collections
users_collection = db['users']
tasks_collection = db['tasks']
