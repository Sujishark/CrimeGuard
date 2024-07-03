import csv
import os

# Replace with your actual CSV file path and output SQL file path
helpers_dir = os.path.dirname(os.path.abspath(__file__))
csv_dir = os.path.join(os.path.dirname(helpers_dir), "csv")

input_csv_file_path = os.path.join(csv_dir, "place.csv")

output_place_sql_file = os.path.join(os.path.dirname(os.path.dirname(helpers_dir)), 'migrations', '002_insert_place_codes.sql')

# Open CSV file for reading
with open(input_csv_file_path, 'r') as csv_file:
    # Create a CSV reader
    csv_reader = csv.DictReader(csv_file)
    
    # Open SQL file for writing
    with open(output_place_sql_file, 'w') as sql_file:
        # Iterate through rows in the CSV file
        for row in csv_reader:
            # Construct the INSERT SQL query
            sql_query = f"INSERT INTO `Place` (`id`, `description`) VALUES ({row['place_code']},\"{row['place_code_description']}\");\n"
            # Write the SQL query to the output file
            sql_file.write(sql_query)
