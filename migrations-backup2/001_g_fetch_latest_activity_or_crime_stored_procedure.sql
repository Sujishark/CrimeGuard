DELIMITER //

CREATE PROCEDURE fetchLatestActivitiesOrCrimes(IN _start INT, IN _end INT)
    BEGIN
        DECLARE _crimeId INT;
        DECLARE _reportedTimestamp TIMESTAMP;
        DECLARE _latestActivityCreatedAt TIMESTAMP;
        DECLARE _latestStatus VARCHAR(100);
        DECLARE _reportedByFirstName VARCHAR(255);
        DECLARE _reportedByLastName VARCHAR(255);
        DECLARE _crimeAddress VARCHAR(255);
        DECLARE _crimeLocation POINT;
        DECLARE _crimeType VARCHAR(255);
        DECLARE _crimePlace VARCHAR(255);

        -- Fetch rows using a cursor
        DECLARE latestActivityCursorDone BOOLEAN DEFAULT FALSE;
        DECLARE latestActivityCursor CURSOR FOR
            WITH LatestActivityTimestamps AS (SELECT crimeId, MAX(createdAt) AS latestActivityCreatedAt FROM Activity GROUP BY crimeId ORDER BY latestActivityCreatedAt DESC LIMIT _start, _end)
            SELECT C.id, reportedTimestamp, C.updatedAt, latestStatus, C.mappingAddress, C.location, firstName, lastName, CrimeType.description, Place.description
            FROM (SELECT id, reportedTimestamp, reportedBy, updatedAt, latestStatus, mappingAddress, crimeTypeId, placeId, location FROM Crime WHERE id IN (SELECT crimeId FROM LatestActivityTimestamps)) AS C
            JOIN User ON C.reportedBy = User.id
            JOIN CrimeType ON C.crimeTypeId = CrimeType.id
            JOIN Place ON C.placeId = Place.id
            ORDER BY C.updatedAt DESC;
    
        -- Handle the case when there are no more rows to fetch
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET latestActivityCursorDone = TRUE;
    
        CREATE TEMPORARY TABLE FinalLatestActivity (
            crimeId INT,
            reportedTimestamp TIMESTAMP,
            latestActivityCreatedAt TIMESTAMP,
            latestStatus VARCHAR(100),
            crimeAddress VARCHAR(255),
            crimeLocation POINT,
            reportedByFirstName VARCHAR(255),
            reportedByLastName VARCHAR(255),
            crimeType VARCHAR(255),
            crimePlace VARCHAR(255)
        );
    
        -- Open the cursor
        OPEN latestActivityCursor;
    
        latestActivityLoop: LOOP
            FETCH latestActivityCursor INTO
                _crimeId, _reportedTimestamp, _latestActivityCreatedAt, _latestStatus, _crimeAddress, _crimeLocation, _reportedByFirstName, _reportedByLastName, _crimeType, _crimePlace;

            IF latestActivityCursorDone THEN
                LEAVE latestActivityLoop;
            END IF;
    
            INSERT INTO FinalLatestActivity VALUES(_crimeId, _reportedTimestamp, _latestActivityCreatedAt, _latestStatus, _crimeAddress, _crimeLocation, _reportedByFirstName, _reportedByLastName, _crimeType, _crimePlace);
        END LOOP;
    
        -- Close the cursor
        CLOSE latestActivityCursor;
    
        SELECT * FROM FinalLatestActivity;

        DROP TEMPORARY TABLE IF EXISTS FinalLatestActivity;
    END //

DELIMITER ;
