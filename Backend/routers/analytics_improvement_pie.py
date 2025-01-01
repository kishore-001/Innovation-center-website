import os
import sys
from typing import Any, Dict, List, Tuple

import pandas as pd
from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.get("/api/analytics/impr_pie_chart_data")
def impr_pie_chart_data() -> List[Dict[str, Any]]:
    path: str = os.path.join(os.path.dirname(__file__), "../../Data/data.xlsx")
    df: pd.DataFrame = pd.read_excel(
        path,
        converters={
            "Start time": lambda x: pd.to_datetime(x, errors="coerce"),
        },
    )

    impr_df: pd.DataFrame = pd.DataFrame(df[df["Category"] == "Improvement"])

    # Get no. of impr in each department
    impr_dept_df: pd.DataFrame = (
        impr_df.groupby("Department ( நீங்கள் வேலை செய்யும் துறை )")
        .size()
        .reset_index(name="Count")
    )
    impr_dept_df: pd.DataFrame = impr_dept_df.sort_values(
        by=["Count"], ascending=False)
    impr_dept_df: pd.DataFrame = impr_dept_df.rename(
        columns={"Department ( நீங்கள் வேலை செய்யும் துறை )": "Department"}
    )

    return impr_dept_df.to_dict(orient="records")
