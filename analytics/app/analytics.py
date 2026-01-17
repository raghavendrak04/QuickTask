from bson import ObjectId
from datetime import datetime, timedelta
from app.database import tasks_collection

def calculate_user_stats(user_id: str):
    """Calculate comprehensive statistics for a user"""
    try:
        user_object_id = ObjectId(user_id)
    except:
        return None
    
    # Get all tasks for user
    all_tasks = list(tasks_collection.find({"userId": user_object_id}))
    
    total_tasks = len(all_tasks)
    completed_tasks = len([t for t in all_tasks if t['status'] == 'Completed'])
    pending_tasks = total_tasks - completed_tasks
    
    # Calculate completion percentage
    completion_percentage = (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0
    
    # Priority breakdown
    priority_breakdown = {
        'Low': len([t for t in all_tasks if t['priority'] == 'Low']),
        'Medium': len([t for t in all_tasks if t['priority'] == 'Medium']),
        'High': len([t for t in all_tasks if t['priority'] == 'High'])
    }
    
    # Status breakdown
    status_breakdown = {
        'Todo': len([t for t in all_tasks if t['status'] == 'Todo']),
        'In Progress': len([t for t in all_tasks if t['status'] == 'In Progress']),
        'Completed': completed_tasks
    }
    
    return {
        'userId': user_id,
        'totalTasks': total_tasks,
        'completedTasks': completed_tasks,
        'pendingTasks': pending_tasks,
        'completionPercentage': round(completion_percentage, 2),
        'priorityBreakdown': priority_breakdown,
        'statusBreakdown': status_breakdown
    }

def calculate_productivity_trends(user_id: str):
    """Calculate productivity trends and patterns"""
    try:
        user_object_id = ObjectId(user_id)
    except:
        return None
    
    # Get all tasks for user
    all_tasks = list(tasks_collection.find({"userId": user_object_id}))
    
    # Calculate tasks per day (last 7 days)
    tasks_per_day = []
    for i in range(7):
        date = datetime.now() - timedelta(days=i)
        date_str = date.strftime('%Y-%m-%d')
        
        # Count completed tasks on this day
        completed_count = len([
            t for t in all_tasks 
            if t['status'] == 'Completed' 
            and t.get('updatedAt') 
            and t['updatedAt'].strftime('%Y-%m-%d') == date_str
        ])
        
        # Count created tasks on this day
        created_count = len([
            t for t in all_tasks 
            if t.get('createdAt') 
            and t['createdAt'].strftime('%Y-%m-%d') == date_str
        ])
        
        tasks_per_day.append({
            'date': date_str,
            'completed': completed_count,
            'created': created_count
        })
    
    # Reverse to show oldest to newest
    tasks_per_day.reverse()
    
    # Calculate weekly stats
    now = datetime.now()
    current_week_start = now - timedelta(days=7)
    last_week_start = now - timedelta(days=14)
    
    current_week_completed = len([
        t for t in all_tasks 
        if t['status'] == 'Completed' 
        and t.get('updatedAt') 
        and t['updatedAt'] >= current_week_start
    ])
    
    current_week_created = len([
        t for t in all_tasks 
        if t.get('createdAt') 
        and t['createdAt'] >= current_week_start
    ])
    
    last_week_completed = len([
        t for t in all_tasks 
        if t['status'] == 'Completed' 
        and t.get('updatedAt') 
        and last_week_start <= t['updatedAt'] < current_week_start
    ])
    
    last_week_created = len([
        t for t in all_tasks 
        if t.get('createdAt') 
        and last_week_start <= t['createdAt'] < current_week_start
    ])
    
    # Calculate average completion time
    completed_tasks = [t for t in all_tasks if t['status'] == 'Completed']
    if completed_tasks:
        total_days = 0
        count = 0
        for task in completed_tasks:
            if task.get('createdAt') and task.get('updatedAt'):
                delta = task['updatedAt'] - task['createdAt']
                total_days += delta.days
                count += 1
        
        avg_days = total_days / count if count > 0 else 0
        avg_completion_time = f"{round(avg_days, 1)} days"
    else:
        avg_completion_time = "N/A"
    
    return {
        'userId': user_id,
        'tasksPerDay': tasks_per_day,
        'weeklyStats': {
            'currentWeek': {
                'completed': current_week_completed,
                'created': current_week_created
            },
            'lastWeek': {
                'completed': last_week_completed,
                'created': last_week_created
            }
        },
        'averageCompletionTime': avg_completion_time
    }
