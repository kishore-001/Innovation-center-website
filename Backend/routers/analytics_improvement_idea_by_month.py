import os
import sys
from typing import Any, Dict, List

import pandas as pd
from fastapi import APIRouter

router = APIRouter()


@router.get("/api/analytics/impr_idea_by_month")
def impr_idea_by_month() -> List[Dict[str, Any]]:
    path: str = os.path.join(os.path.dirname(__file__), "../../Data/data.xlsx")
    df: pd.DataFrame = pd.read_excel(
        path,
        converters={
            "Start time": lambda x: pd.to_datetime(x, errors="coerce"),
        },
    )

    impr_df: pd.DataFrame = pd.DataFrame(df[df["Category"] == "Improvement"])
    impr_df["Month"] = impr_df["Start time"].dt.month
    impr_df["Year"] = impr_df["Start time"].dt.year

    impr_df: pd.DataFrame = (
        impr_df.groupby(["Year", "Month"]).size().reset_index(name="Count")
    )
    impr_df: pd.DataFrame = impr_df.sort_values(by=["Year", "Month"])

    return impr_df.to_dict(orient="records")


print(impr_idea_by_month())
