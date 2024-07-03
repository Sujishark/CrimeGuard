import random
from faker import Faker
fake = Faker()

def generate_random_user():
    first_names = [fake.first_name() for _ in range(50)]
    last_names = [fake.last_name() for _ in range(50)]
    genders = ['Male', 'Female','Non-Binary']
    streets = ['Main St', 'Oak St', 'Maple Ave', 'Elm St', 'Cedar Dr']
    
    first_name = random.choice(first_names)
    last_name = random.choice(last_names)
    phone_number = random.randint(1000000000, 9999999999)
    email = f"{first_name.lower()}{last_name.lower()}{random.randint(100, 999)}@gmail.com"
    password = ''.join(random.choices('abcdefghijklmnopqrstuvwxyz0123456789', k=8))
    gender = random.choice(genders)
    house_name = f"{random.randint(1, 100)}, {random.randint(100, 999)}"
    street = random.choice(streets)
    location = f"POINT({random.uniform(-180, 180)} {random.uniform(-90, 90)})"

    return f"('{first_name}', '{last_name}', {phone_number}, '{email}', '{password}', '{gender}', '{house_name}', '{street}', ST_GeomFromText('{location}'))"

# Generate 10 random INSERT statements
insert_statements = []
for _ in range(1000):
    insert_statements.append(generate_random_user())

# Print the generated statements
retString=""
for i, statement in enumerate(insert_statements, 1):
    # print(f"INSERT INTO User (firstName, lastName, phoneNumber, email, password, gender, houseNameWithNumberBlock, addressStreet, location) VALUES {statement};")
    retString+=f"INSERT INTO User (firstName, lastName, phoneNumber, email, password, gender, houseNameWithNumberBlock, addressStreet, location) VALUES {statement};"

# Write SQL commands to output file
sql_file_path = 'output.sql'
with open(sql_file_path, 'w') as sqlfile:
    sqlfile.write(retString)
