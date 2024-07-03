
import os

def split_sql_file(input_sql_file, output_directory, lines_per_file=500):
    # Create the output directory if it doesn't exist
    os.makedirs(output_directory, exist_ok=True)

    # Open the input SQL file for reading
    with open(input_sql_file, 'r') as input_file:
        # Read all lines from the input file
        all_lines = input_file.readlines()

        # Initialize variables
        file_count = 1
        line_count = 0
        output_file = None

        # Iterate through each line in the input file
        for line in all_lines:
            # Check if a new file should be created
            if line_count % lines_per_file == 0:
                # Close the previous output file if it exists
                if output_file:
                    output_file.close()

                # Create a new output file
                output_file_path = os.path.join(output_directory, f'006_insert_crime_{file_count}.sql')
                output_file = open(output_file_path, 'w')
                file_count += 1

            # Write the current line to the output file
            output_file.write(line)
            line_count += 1

        # Close the last output file
        if output_file:
            output_file.close()

if __name__ == "__main__":
    # Replace with your actual input SQL file path and output directory
    input_sql_file_path = '/Users/anirudh711/Documents/Projects/fa23-cs411-team035-ChambanaGuild/migrations/006_insert_crime.sql'
    output_directory_path = '/Users/anirudh711/Documents/Projects/fa23-cs411-team035-ChambanaGuild/migrations/'
    # Specify the number of lines per file (500 in this case)
    lines_per_file = 500

    # Split the SQL file
    split_sql_file(input_sql_file_path, output_directory_path, lines_per_file)
