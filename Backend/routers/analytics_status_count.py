import pandas as pd
from fastapi import APIRouter

router = APIRouter()


@router.get("/api/analytics/status")
def status_count():
    df = pd.read_excel("../Data/data.xlsx")
    df["Status"] = df["Status"].str.strip()
    status_counts = df["Status"].value_counts().to_dict()
    print(status_count)
    total_count = status_counts.get("Feasible", 0)
    result = {"count": total_count}
    return result

