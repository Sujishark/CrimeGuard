DROP DATABASE IF EXISTS CrimeGuard;
CREATE DATABASE CrimeGuard;

USE CrimeGuard;

SET time_zone = 'UTC';

CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(12) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(100) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    houseNameWithNumberBlock VARCHAR(100) NOT NULL,
    addressStreet VARCHAR(100) NOT NULL,
    location POINT,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP ON UPDATE NOW() DEFAULT NOW()
);

CREATE TABLE Weapon(
    id INT PRIMARY KEY,
    description VARCHAR(100)
);

CREATE TABLE Place(
    id INT PRIMARY KEY,
    description VARCHAR(100)
);

CREATE TABLE CrimeType(
    id INT PRIMARY KEY,
    description VARCHAR(100)
);

CREATE TABLE Crime (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reportedTimestamp TIMESTAMP NOT NULL,
    description VARCHAR(500) DEFAULT NULL,
    mappingAddress VARCHAR(500) NOT NULL,
    location POINT NOT NULL,
    latestStatus VARCHAR(100) DEFAULT "Created",
    reportedBy INT NOT NULL,
    crimeTypeId INT NOT NULL,
    placeId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP ON UPDATE NOW() DEFAULT NOW(),
    FOREIGN KEY (reportedBy) REFERENCES User(id),
    FOREIGN KEY (crimeTypeId) REFERENCES CrimeType(id),
    FOREIGN KEY (placeId) REFERENCES Place(id)
);

CREATE TABLE Activity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    crimeId INT NOT NULL,
    status VARCHAR(100),
    viewCount INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP ON UPDATE NOW() DEFAULT NOW(),
    FOREIGN KEY (crimeId) REFERENCES Crime(id)
);

CREATE TABLE CrimeWeapon (
    weaponId INT NOT NULL,
    crimeId INT NOT NULL,
    PRIMARY KEY (weaponId, crimeId),
    FOREIGN KEY (weaponId) REFERENCES Weapon(id),
    FOREIGN KEY (crimeId) REFERENCES Crime(id)
);


CREATE TABLE Comment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    crimeId INT NOT NULL,
    userId INT NOT NULL,
    body VARCHAR(1000),
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP ON UPDATE NOW() DEFAULT NOW(),
    FOREIGN KEY (crimeId) REFERENCES Crime(id),
    FOREIGN KEY (userId) REFERENCES User(id)
);

CREATE TABLE Notification (
    userId INT NOT NULL,
    activityId INT NOT NULL,
    bannerContent VARCHAR(500),
    bannerNavigation VARCHAR(500),
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP ON UPDATE NOW() DEFAULT NOW(),
    isNotified BOOLEAN DEFAULT FALSE,
    isRead BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (userId,activityId),
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (activityId) REFERENCES Activity(id) ON DELETE CASCADE
);

CREATE TABLE Subscription (
    userId INT,
    crimeId INT,
    PRIMARY KEY (userId, crimeId),
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (crimeId) REFERENCES Crime(id) ON DELETE CASCADE
);