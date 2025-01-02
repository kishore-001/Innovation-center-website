import os
import sys
from typing import Any, Dict, List

import pandas as pd
from fastapi import APIRouter

router = APIRouter()


@router.get("/api/analytics/idea_by_month")
def idea_by_month() -> List[Dict[str, Any]]:
    path: str = os.path.join(os.path.dirname(__file__), "../../Data/data.xlsx")
    df: pd.DataFrame = pd.read_excel(
        path,
        converters={
            "Start time": lambda x: pd.to_datetime(x, errors="coerce"),
        },
    )

    df["Month"] = df["Start time"].dt.month
    df["Year"] = df["Start time"].dt.year

    df: pd.DataFrame = df.groupby(
        ["Year", "Month"]).size().reset_index(name="Count")
    df: pd.DataFrame = df.sort_values(by=["Year", "Month"])

    return df.to_dict(orient="records")
