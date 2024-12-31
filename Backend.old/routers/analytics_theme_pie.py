from fastapi import APIRouter
import pandas as pd

router = APIRouter()

@router.get("/api/analytics/theme_pie")
def theme_pie():
    # Load the data from the Excel file
    df = pd.read_excel('../Data/data.xlsx')

    # Split the categories by ";" and explode the DataFrame
    df_exploded = df["Category of Idea ( உங்கள் யோசனை கீழ்க்காணும் எந்த வகையில் பொருந்துகிறது?)"].str.split(';').explode()
    df_exploded = df_exploded[df_exploded != ""]

    # Group by the exploded categories and count the occurrences
    category_counts = df_exploded.value_counts().nlargest(6)
    # Prepare the labels and data for the pie chart
    labels = category_counts.index.tolist()
    data = category_counts.values.tolist()

    # Return the labels and data as a JSON response
    return {"labels": labels, "data": data}
    