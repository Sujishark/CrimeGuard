import csv
import random
from faker import Faker
import os

fake = Faker()

# Replace with your actual CSV file path and output SQL file path
helpers_dir = os.path.dirname(os.path.abspath(__file__))
csv_dir = os.path.join(os.path.dirname(helpers_dir), "csv") 

user_csv_file = os.path.join(csv_dir, 'users_out.csv')
crime_csv_file = os.path.join(csv_dir, 'crime.csv')

comment_sql_file = os.path.join(os.path.dirname(os.path.dirname(helpers_dir)), 'migrations', '009_insert_comment.sql')

# Open CSV file for reading
with open(user_csv_file, 'r') as user_file, \
    open(crime_csv_file, 'r') as crime_file, \
    open(comment_sql_file, 'w') as sql_file:
    
    # Create a CSV reader
    user = csv.DictReader(user_file)
    crime = csv.DictReader(crime_file)
    totalRows = 1000

    # Set a fixed random seed for reproducibility
    seed = 42
    random.seed(seed)
    
    # Generate random values
    crimeId = []
    for row in crime:
        crimeId.append(row['id'])
    random.shuffle(crimeId)
    crimeId = crimeId[:totalRows]

    userId = []    
    for row in user:
        userId.append(row['id'])
    random.shuffle(userId)
    userId = userId[:totalRows]

    body = [f'Comment {i}' for i in range(1, totalRows + 1)]
        
    # Write queries to file
    for i in range(totalRows):
        sql_query = f"INSERT INTO `Comment` (`crimeId`, `userId`, `body`, `createdAt`, `updatedAt`) VALUES ({crimeId[i]}, {userId[i]}, '{body[i]}', NOW(), NOW());\n"
        
        sql_file.write(sql_query)
