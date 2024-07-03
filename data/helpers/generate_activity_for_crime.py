import csv
import random
import os

helpers_dir = os.path.dirname(os.path.abspath(__file__))
csv_dir = os.path.join(os.path.dirname(helpers_dir), "csv") 

crime_csv_file = os.path.join(csv_dir, 'crime.csv')

sql_file_path = os.path.join(os.path.dirname(os.path.dirname(helpers_dir)), 'migrations', '007_insert_activity.sql')

# Open CSV file for reading
with open(crime_csv_file, 'r') as csv_file:
    # Create a CSV reader
    csv_reader = csv.DictReader(csv_file)
    
    # Open SQL file for writing
    with open(sql_file_path, 'w') as sql_file:
        # Iterate through rows in the CSV file
        i=0
        for row in csv_reader:
            if i==1000:
                break
            # Generate random values for activity table
            status = random.choice(['Created', 'In progress', 'False Alarm', 'Resolved'])
            view_count = random.randint(0, 100)
            
            # Construct the INSERT SQL query for activity table
            sql_query = f"INSERT INTO `Activity` (`crimeId`, `status`, `viewCount`, `createdAt`, `updatedAt`) VALUES ({row['id']}, '{status}', {view_count}, NOW(), NOW());\n"
            i+=1
            # Write the SQL query to the output file
            sql_file.write(sql_query)
