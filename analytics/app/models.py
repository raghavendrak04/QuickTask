from pydantic import BaseModel
from typing import Dict, List

class UserStats(BaseModel):
    userId: str
    totalTasks: int
    completedTasks: int
    pendingTasks: int
    completionPercentage: float
    priorityBreakdown: Dict[str, int]
    statusBreakdown: Dict[str, int]

class DailyStats(BaseModel):
    date: str
    completed: int
    created: int

class WeeklyStats(BaseModel):
    completed: int
    created: int

class ProductivityTrends(BaseModel):
    userId: str
    tasksPerDay: List[DailyStats]
    weeklyStats: Dict[str, WeeklyStats]
    averageCompletionTime: str
