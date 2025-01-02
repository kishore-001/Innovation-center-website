
import pandas as pd
df = pd.read_excel("../Data/data.xlsx", skiprows=1)
print(df.columns.tolist())
