from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.models import UserStats, ProductivityTrends
from app.analytics import calculate_user_stats, calculate_productivity_trends
import os

app = FastAPI(
    title="QuickTask Analytics API",
    description="Python microservice for task analytics and productivity insights",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "message": "QuickTask Analytics API",
        "version": "1.0.0",
        "endpoints": ["/user-stats/{userId}", "/productivity-trends/{userId}"]
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "analytics"}

@app.get("/user-stats/{userId}", response_model=UserStats)
def get_user_stats(userId: str):
    """
    Get comprehensive statistics for a specific user
    
    - **userId**: MongoDB ObjectId of the user
    
    Returns:
    - Total tasks
    - Completed vs pending
    - Completion percentage
    - Priority breakdown
    - Status breakdown
    """
    stats = calculate_user_stats(userId)
    
    if stats is None:
        raise HTTPException(status_code=400, detail="Invalid user ID format")
    
    return stats

@app.get("/productivity-trends/{userId}", response_model=ProductivityTrends)
def get_productivity_trends(userId: str):
    """
    Get productivity trends and patterns for a specific user
    
    - **userId**: MongoDB ObjectId of the user
    
    Returns:
    - Tasks per day (last 7 days)
    - Weekly statistics (current vs last week)
    - Average completion time
    """
    trends = calculate_productivity_trends(userId)
    
    if trends is None:
        raise HTTPException(status_code=400, detail="Invalid user ID format")
    
    return trends

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 5000))
    uvicorn.run(app, host="0.0.0.0", port=port)
