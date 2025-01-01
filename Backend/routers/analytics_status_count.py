import pandas as pd
from fastapi import APIRouter

router = APIRouter()


@router.get("/api/analytics/status")
def status_count():
    df = pd.read_excel("../Data/data.xlsx")
    status_counts = df["Status"].value_counts().to_dict()
    total_count = sum(status_counts.get(status, 0)
                      for status in ["L3", "L4", "L5"])
    result = {"count": total_count}
    return result

