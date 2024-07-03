-- Insert Ani
INSERT INTO `User` (id, firstName, lastName, phoneNumber, email, password, gender, houseNameWithNumberBlock, addressStreet, location) VALUES (1, "Anirudh", "Madhavan", "7397438592", "anirudhgraddd@gmail.com", "password", "male", "7", "809 W Stoughton", ST_GeomFromText('POINT(40.7128 -74.0060)'));

-- Insert Deleted User
INSERT INTO `User` (id, firstName, lastName, phoneNumber, email, password, gender, houseNameWithNumberBlock, addressStreet, location) VALUES (-1, "[Deleted", "User]", "1781222222", "deleted.user@gmail.com", "pwd1", "male", "1", "abc", ST_GeomFromText('POINT(40.7128 -74.0060)'));