import pandas as pd
from fastapi import APIRouter

router = APIRouter()


@router.get("/api/analytics/idea")
def idea_count():
    df = pd.read_excel("../Data/data.xlsx")
    total_ideas = len(df)
    return {"count": total_ideas}

