import pandas as pd
from fastapi import APIRouter

router = APIRouter()


@router.get("/api/analytics/dept_bar")
def dept_bar():
    # Load the Excel file
    df = pd.read_excel("../Data/data.xlsx")

    # Group by the department and count the occurrences
    dept_counts = df["Department ( நீங்கள் வேலை செய்யும் துறை )"].value_counts(
    )

    # Prepare the data for the bar chart
    data = dept_counts.values.tolist()
    labels = dept_counts.index.tolist()

    return {"data": data, "labels": labels}

