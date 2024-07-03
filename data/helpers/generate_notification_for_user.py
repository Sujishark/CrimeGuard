import csv
import random
from faker import Faker

fake = Faker()

# Replace with your actual CSV file paths and output SQL file path
users_csv_file = '/Users/anirudh711/Documents/Projects/fa23-cs411-team035-ChambanaGuild/data/csv/users_out.csv'
activity_csv_file = '/Users/anirudh711/Documents/Projects/fa23-cs411-team035-ChambanaGuild/data/csv/activity_out.csv'
sql_file_path = '/Users/anirudh711/Documents/Projects/fa23-cs411-team035-ChambanaGuild/migrations/008_insert_notification.sql'
# Open users CSV file for reading
with open(users_csv_file, 'r') as users_csv:
    users_reader = csv.DictReader(users_csv)
    users_data = list(users_reader)

# Open activity CSV file for reading
with open(activity_csv_file, 'r') as activity_csv:
    activity_reader = csv.DictReader(activity_csv)
    activity_data = list(activity_reader)

# Open SQL file for writing
with open(sql_file_path, 'w') as sql_file:
    # Iterate through users and generate notifications
    for user_row in users_data:
        user_id = user_row['id']
        
        # Generate more than 5 notifications for each user
        for _ in range(5):
            # Choose a random activity for the notification
            activity_row = random.choice(activity_data)
            activity_id = activity_row['id']
            
            # Generate random values for notification table
            banner_content = fake.word()
            banner_navigation = fake.url()
            
            # Construct the INSERT SQL query for notification table
            sql_query = f"INSERT INTO `Notification` (`userId`, `activityId`, `bannerContent`, `bannerNavigation`, `createdAt`, `updatedAt`) VALUES ({user_id}, {activity_id}, '{banner_content}', '{banner_navigation}', NOW(), NOW());\n"
            
            # Write the SQL query to the output file
            sql_file.write(sql_query)