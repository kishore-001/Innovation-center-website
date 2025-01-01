import os
import sys
from typing import Any, Dict, List

import pandas as pd
from fastapi import APIRouter

router = APIRouter()


@router.get("/api/analytics/inno_idea_by_month")
def inno_idea_by_month() -> List[Dict[str, Any]]:
    path: str = os.path.join(os.path.dirname(__file__), "../../Data/data.xlsx")
    df: pd.DataFrame = pd.read_excel(
        path,
        converters={
            "Start time": lambda x: pd.to_datetime(x, errors="coerce"),
        },
    )

    inno_df: pd.DataFrame = pd.DataFrame(df[df["Category"] == "innovation"])
    inno_df["Month"] = inno_df["Start time"].dt.month
    inno_df["Year"] = inno_df["Start time"].dt.year

    inno_df: pd.DataFrame = (
        inno_df.groupby(["Year", "Month"]).size().reset_index(name="Count")
    )
    inno_df: pd.DataFrame = inno_df.sort_values(by=["Year", "Month"])

    return inno_df.to_dict(orient="records")


print(inno_idea_by_month())
