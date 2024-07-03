import pandas as pd

def remove_duplicates_and_save(input_csv, output_csv, columnNames):
    # Read the CSV file into a DataFrame
    df = pd.read_csv(input_csv, encoding='latin-1', low_memory=False)

    # Fetch two columns and drop duplicates
    default_value = 0
    columnNames.append("reported_by")
    df["reported_by"] = "1"
    df['date_reported'] = pd.to_datetime(df['date_reported'], format='%m/%d/%Y')

    # Change the format to 'yyyy-mm-dd'
    df['Formatted_Date'] = df['date_reported'].dt.strftime('%Y-%m-%d')
    df_filtered = df[columnNames].drop_duplicates()
    sorted_df = df_filtered.sort_values(columnNames[0], ascending=True)
    # Save the result to a new CSV file
    sorted_df.to_csv(output_csv, index=False)

if __name__ == "__main__":
    # Replace 'input.csv', 'output.csv', 'column1', and 'column2' with your actual values
    input_csv = "/Users/anirudh711/Documents/Temp/db-data/police-incidents-upload_20191226.csv"
    output_csv = "/Users/anirudh711/Documents/Temp/db-data/final-data/crime-data2.csv"

    # For getting crime codes
    # column1= "crime_code"
    # column2= "crime_description"
    columnNames=["date_reported","time_reported","house_number_with_block","address_street","geo_code","crime_code","place_code"]
    remove_duplicates_and_save(input_csv, output_csv, columnNames)

    print(f"Duplicates removed and saved to {output_csv}")