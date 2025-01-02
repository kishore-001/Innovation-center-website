import os
import sys
from typing import Any, Dict, List

import pandas as pd
from fastapi import APIRouter

router = APIRouter()


@router.get("/api/analytics/innovation_vs_improvement")
def innovation_vs_improvement() -> Dict[str, Any]:
    path: str = os.path.join(os.path.dirname(__file__), "../../Data/data.xlsx")
    df: pd.DataFrame = pd.read_excel(
        path,
        converters={
            "Start time": lambda x: pd.to_datetime(x, errors="coerce"),
        },
    )

    inno_df: pd.DataFrame = df[df["Category"] == "innovation"]
    impr_df: pd.DataFrame = df[df["Category"] == "Improvement"]
    dup_df: pd.DataFrame = df[df["Category"] == "Duplication"]

    inno_count: int = inno_df.shape[0]
    impr_count: int = impr_df.shape[0]
    dup_count: int = dup_df.shape[0]

    return {
        "innovation": inno_count,
        "improvement": impr_count,
        "duplication": dup_count,
    }
