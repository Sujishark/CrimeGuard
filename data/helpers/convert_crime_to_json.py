import csv
import json

def extract_lat_lon(location_str):
    # Extract latitude and longitude from the location string
    point_str = location_str.replace('POINT(', '').replace(')', '')
    lat, lon = map(float, point_str.split())
    return lat, lon


import csv
import json
from datetime import datetime

def extract_year(timestamp_str):
    try:
        # Extract year from the timestamp string
        timestamp = datetime.strptime(timestamp_str, "%Y-%m-%d %H:%M:%S%z")
        return timestamp.year
    except ValueError:
        # Handle invalid timestamp, return None or a default value
        return None

def csv_to_json(csv_file_path, json_file_path):
    json_data = {}

    with open(csv_file_path, 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)

        for row in csv_reader:
            # Extract year from the timestamp column
            year = extract_year(row['timestamp_reported'])
            # Add latitude and longitude to the row
            row['latitude'], row['longitude'] = extract_lat_lon(row['location'])
            # Ignore reportedBy and location
            del row['reported_by']
            del row['location']
            del row['mapping_address']
            del row['timestamp_reported']
            del row['crime_code']
            del row['place_code']
            del row['id']
            del row['latest_status']

           

            # Group data by year
            if year not in json_data:
                json_data[year] = []
            json_data[year].append(row)

    with open(json_file_path, 'w') as json_file:
        json.dump(json_data, json_file, indent=2)

# Example usage:
csv_file_path = '/Users/anirudh711/Documents/Projects/fa23-cs411-team035-ChambanaGuild/data/csv/crime.csv'
json_file_path = 'test2.json'
csv_to_json(csv_file_path, json_file_path)
