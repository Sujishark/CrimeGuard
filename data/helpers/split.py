import pandas as pd

# Read the original CSV file into a DataFrame
input_csv = '/Users/anirudh711/Documents/Projects/fa23-cs411-team035-ChambanaGuild/data/Data/crime-filtered.csv'
df = pd.read_csv(input_csv)

# Calculate the number of rows per output file
rows_per_file = len(df) // 100

# Split the DataFrame into 10 smaller DataFrames
split_dfs = [df.iloc[i:i + rows_per_file] for i in range(0, len(df), rows_per_file)]

# Save each smaller DataFrame to a separate CSV file
for i, split_df in enumerate(split_dfs):
    if i==4:
        break
    output_csv = f'/Users/anirudh711/Documents/Projects/fa23-cs411-team035-ChambanaGuild/data/Data/crime-out/crime-data-out-{i + 1}.csv'
    split_df.to_csv(output_csv, index=False)
    print(f'Saved {output_csv}')

print('Splitting completed.')