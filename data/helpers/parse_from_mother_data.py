import datetime
import pandas as pd
import numpy as np
import csv

motherDataCsv = r"/opt/cs411/fa23-cs411-team035-ChambanaGuild/mother_data.csv"
motherData = pd.read_csv(motherDataCsv, encoding='latin-1', low_memory=False)

placeCsv = r"../csv/place.csv"
crimeWeaponCsv = r"../csv/crime_weapon.csv"
crimeCsv = r"../csv/crime.csv"
crimeTypeCsv = r"../csv/crime_type.csv"
weaponCsv = r"../csv/weapon.csv"
commentCsv = r"../csv/comment.csv"
locationCsv = r"../csv/location.csv"

# Filtering out the required columns from the Urbana Incidents Report
crimeColumns = columnNames=["date_reported", "time_reported", 
                            "mapping_address",
                            "crime_code", "crime_description", 
                            "place_code", "place_code_description", 
                            "weapons_code_1", "weapon_1_description", "weapons_code_2", "weapon_2_description", "weapons_code_3", "weapon_3_description"]
crimeData = motherData[crimeColumns].copy()

# Clean out Crime data
crimeData = crimeData.drop_duplicates()                                                       # Drop Duplicates
crimeData["date_reported"] = pd.to_datetime(crimeData["date_reported"], format='%m/%d/%Y')    # Clean out 'date_reported' column
crimeData = crimeData[crimeData["date_reported"].dt.year >= 1970]
crimeData["date_reported"] = crimeData["date_reported"].dt.strftime('%Y-%m-%d')               # Clean out 'date_reported' column
crimeData["time_reported"] = crimeData["time_reported"].apply(lambda x: str(x) + ":00" if x and str(x) != "24:00" else "00:00:00" if x and str(x) == "24:00" else None)

removeInvalidNumbers = lambda x: str(x).split(".")[0].strip() if x != "" and str(x).find(".") != -1 else ""
crimeData["weapons_code_1"] = crimeData["weapons_code_1"].apply(removeInvalidNumbers)
crimeData["weapons_code_2"] = crimeData["weapons_code_2"].apply(removeInvalidNumbers)
crimeData["weapons_code_3"] = crimeData["weapons_code_3"].apply(removeInvalidNumbers)

timestampColumns = ["time_reported", "date_reported"]
crimeData = crimeData.dropna(subset=timestampColumns)
crimeData["timestamp_reported"] = crimeData["date_reported"].astype(str) + " " + crimeData["time_reported"].astype(str)
crimeData["timestamp_reported"] = crimeData["timestamp_reported"].apply(lambda x: datetime.datetime.strptime(x, '%Y-%m-%d %H:%M:%S'))
crimeData["timestamp_reported"] = crimeData["timestamp_reported"].dt.tz_localize("UTC")
crimeData = crimeData.drop(columns=timestampColumns, axis=1)

# Load Latitude and Longitude for the address
addressToLocation = {}
with open(locationCsv, mode='r') as file:
    reader = csv.reader(file)
    for row in reader:
        key, value = row
        latitude, longitude = map(str, value.split(';'))
        addressToLocation[key] = f"POINT({latitude} {longitude})"

# Add Latitude and Longitude to the Crime data
crimeData["location"] = crimeData["mapping_address"].apply(lambda address: addressToLocation[address] if address in addressToLocation else None)
crimeData = crimeData.dropna(subset=["location", "mapping_address"])

# Add 'id' column to the dataset
crimeData["id"] = range(1, len(crimeData) + 1)

# Add Latitude and Longitude to the Crime data
crimeData["location"] = crimeData["mapping_address"].apply(lambda address: addressToLocation[address] if address in addressToLocation else "")

# Add Latest Status
crimeData["latest_status"] = "Created"

# Add Crime Description
crimeData["description"] = ["Crime Description " + str(i + 1) for i in range(len(crimeData))]

# Extract Place data
placeColumns = ["place_code", "place_code_description"]
placeData = crimeData[placeColumns].copy()
placeData = placeData.drop_duplicates(subset="place_code")
placeData = placeData.sort_values("place_code")
crimeData = crimeData.drop("place_code_description", axis=1)

# Extract Crime Type data
crimeTypeColumns = ["crime_code", "crime_description"]
crimeTypeData = crimeData[crimeTypeColumns].copy()
crimeTypeData = crimeTypeData.drop_duplicates(subset="crime_code")
crimeTypeData = crimeTypeData.sort_values("crime_code")
crimeData = crimeData.drop("crime_description", axis=1)

# Crime User mapping
# TODO: Need to create user data and map it to the crimes
crimeData["reported_by"] = "1"

# Extract Weapon data
weaponColumns1 = ["id", "weapons_code_1", "weapon_1_description"]
weaponData1 = crimeData[weaponColumns1].copy()
weaponData1.rename(columns= {"weapons_code_1": "weapon_code", "weapon_1_description": "weapon_description"} , inplace=True)

weaponColumns2 = ["id", "weapons_code_2", "weapon_2_description"]
weaponData2 = crimeData[weaponColumns2].copy()
weaponData2.rename(columns= {"weapons_code_2": "weapon_code", "weapon_2_description": "weapon_description"} , inplace=True)

weaponColumns3 = ["id", "weapons_code_3", "weapon_3_description"]
weaponData3 = crimeData[weaponColumns3].copy()
weaponData3.rename(columns= {"weapons_code_3": "weapon_code", "weapon_3_description": "weapon_description"} , inplace=True)

weaponData = pd.concat([weaponData1, weaponData2, weaponData3])
weaponData = weaponData.drop_duplicates(subset="weapon_code")
weaponData = weaponData.dropna()
weaponData = weaponData.sort_values("weapon_code")
crimeData = crimeData.drop(["weapons_code_1", "weapon_1_description", "weapons_code_2", "weapon_2_description", "weapons_code_3", "weapon_3_description"], axis=1)

# Extract Crime - Weapon Relation
crimeWeaponColumns = ["weapon_code", "id"]
crimeWeaponData = weaponData[crimeWeaponColumns].copy()
crimeWeaponData = crimeWeaponData.drop_duplicates()
crimeWeaponData = crimeWeaponData.sort_values("id")
weaponData = weaponData.drop("id", axis=1)

# Create Comments
# Set a fixed random seed for reproducibility
seed = 42
np.random.seed(seed)
totalRows = len(crimeData.index)
commentColumns = ["id", "crime_id", "user_id", "body", "createdAt", "updatedAt"]
userId = np.arange(1,totalRows + 1)
np.random.shuffle(userId)
crimeId = crimeData["id"].sample(totalRows)
id = np.arange(1, totalRows + 1)
body = [f'Comment {i}' for i in range(1, totalRows + 1)]
timestamp = np.array([str(np.datetime64(datetime.datetime.now())) for _ in range(totalRows)])
commentData = pd.DataFrame({"id": id, "crime_id": crimeId, "user_id": userId,
                             "body": body, "createdAt": timestamp, "updatedAt": timestamp}, 
                             columns=commentColumns)

# Reorder Columns
desiredCrimeColumns = ["id", "mapping_address", "location", "timestamp_reported", "latest_status", "description", "crime_code", "place_code", "reported_by"]
crimeData = crimeData[desiredCrimeColumns]

desiredCrimeWeaponColumns = ["id", "weapon_code"]
crimeWeaponData = crimeWeaponData[desiredCrimeWeaponColumns]

desiredCommentColumns = ["id", "body", "createdAt", "updatedAt", "crime_id", "user_id"]
commentData = commentData[desiredCommentColumns]

# Export Data to CSV
print("Crime Sample")
print(crimeData.head())
crimeData.to_csv(crimeCsv, index=False)
print("")

print("Weapon Sample")
print(weaponData.head())
weaponData.to_csv(weaponCsv, index=False)
print("")

print("CrimeWeapon Sample")
print(crimeWeaponData.head())
crimeWeaponData.to_csv(crimeWeaponCsv, index=False)
print("")

print("CrimeType Sample")
print(crimeTypeData.head())
crimeTypeData.to_csv(crimeTypeCsv, index=False)
print("")

print("Place Sample")
print(placeData.head())
placeData.to_csv(placeCsv, index=False)
print("")

print("Comment Sample")
print(commentData.head())
commentData.to_csv(commentCsv, index=False)
print("")

# Unused code
# import requests
# import time
# def get_lat_lng(address):
#     # api_key = 'AIzaSyAIzmJyl1MUmBVX8BI4ay_w0Wi6nhUJa-A'
#     base_url = "https://geocode.maps.co/search"
#     params = {
#         "q": address
#     }

#     try:
#         response = requests.get(base_url, params=params)
#         # print(response)
#         data = response.json()
#         if data:
#             return str(data[0]["lat"]) + ";" + str(data[0]["lon"])
#         else:
#             return None
#     except:
#         print("Error while processing " + address)
#         return None

#     if data["status"] == "OK" and data.get("results"):
#         location = data["results"][0]["geometry"]["location"]
#         latitude = location["lat"]
#         longitude = location["lng"]
#         return str(latitude, longitude)
#     else:
#         print("Geocoding failed. Status:", data.get("status"))
#         return None
#     calling the Nominatim tool and create Nominatim class
#     loc = Nominatim(user_agent="GreenGhost")

#     # entering the location name
#     geoCode = loc.geocode(address)

#     if geoCode:
#         return str(geoCode.latitude) + ";" + str(geoCode.longitude)
#     else:
#         return None
# try:
#     with open(locationCsv, mode='a', newline='') as csvfile:
#         csv_writer = csv.writer(csvfile)
#         for address in uniqueMappingAddress:
#             latLong = get_lat_lng(address)
#             time.sleep(1.01)
#             if latLong:
#                 addressToLocation[address] = latLong
#                 csv_writer.writerow([address, latLong])
#                 print(str(i) + " " + str(address) + " " + str(latLong))
#             i += 1
#         csvfile.close()    
# except Exception as e:
#     print(e)
#     print("Error writing location")