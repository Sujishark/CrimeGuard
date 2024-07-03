import csv
import os

# Replace with your actual CSV file path and output SQL file path
helpers_dir = os.path.dirname(os.path.abspath(__file__))
csv_dir = os.path.join(os.path.dirname(helpers_dir), "csv")

input_csv_file_path = os.path.join(csv_dir, "crime_weapon.csv")

output_crime_weapon_sql_file = os.path.join(os.path.dirname(os.path.dirname(helpers_dir)), 'migrations', '010_insert_crime_weapon.sql')

# Open CSV file for reading
with open(input_csv_file_path, 'r') as csv_file:
    # Create a CSV reader
    csv_reader = csv.DictReader(csv_file)
    
    # Open SQL file for writing
    with open(output_crime_weapon_sql_file, 'w') as sql_file:
        # Iterate through rows in the CSV file
        for row in csv_reader:
            # Construct the INSERT SQL query
            sql_query = f"INSERT INTO `CrimeWeapon` (`crimeId`, `weaponId`) VALUES ({row['id']},\"{row['weapon_code']}\");\n"
            # Write the SQL query to the output file
            sql_file.write(sql_query)
