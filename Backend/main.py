import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import (
    add_user,
    analytics_dept_bar,
    analytics_idea_by_month,
    analytics_idea_count,
    analytics_improvement_idea_by_month,
    analytics_innovation_idea_by_month,
    analytics_innovation_vs_improvement,
    analytics_status_count,
    analytics_theme_pie,
    api,
    decode,
    delete_review,
    download,
    fetch_allowed_user,
    fetch_data,
    fetch_review,
    login,
    register,
    remove_user,
    update_review,
    update_status,
    upload,
)

app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include routers

app.include_router(api.router)

# Admin Page

app.include_router(fetch_data.router)
app.include_router(fetch_review.router)
app.include_router(update_review.router)
app.include_router(update_status.router)
app.include_router(delete_review.router)
app.include_router(upload.router)
app.include_router(download.router)
app.include_router(add_user.router)
app.include_router(remove_user.router)

# Data Analytics

app.include_router(analytics_idea_count.router)
app.include_router(analytics_status_count.router)
app.include_router(analytics_dept_bar.router)
app.include_router(analytics_theme_pie.router)
app.include_router(analytics_idea_by_month.router)
app.include_router(analytics_innovation_vs_improvement.router)
app.include_router(analytics_innovation_idea_by_month.router)
app.include_router(analytics_improvement_idea_by_month.router)

# sign in and sign up Api

app.include_router(login.router)
app.include_router(register.router)
app.include_router(fetch_allowed_user.router)

# Decode JWT token

app.include_router(decode.router)
