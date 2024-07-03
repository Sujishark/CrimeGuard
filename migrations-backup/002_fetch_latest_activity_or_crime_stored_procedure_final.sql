DELIMITER //

CREATE PROCEDURE fetchLatestActivityOrCrime(IN fetchType VARCHAR(50),IN _offset INT, IN _limit INT, IN cId INT, IN _crimeTypeId INT, IN _placeId INT, IN _dateLeft TIMESTAMP, IN _dateRight TIMESTAMP)
    BEGIN
        DECLARE _crimeId INT;
        DECLARE _reportedTimestamp TIMESTAMP;
        DECLARE _latestActivityCreatedAt TIMESTAMP;
        DECLARE _latestStatus VARCHAR(100);
        DECLARE _crimeDescription VARCHAR(500);
        DECLARE _reportedByFirstName VARCHAR(255);
        DECLARE _reportedByLastName VARCHAR(255);
        DECLARE _crimeAddress VARCHAR(255);
        DECLARE _crimeLocation POINT;
        DECLARE _crimeType VARCHAR(255);
        DECLARE _crimePlace VARCHAR(255);
        DECLARE _weaponsUsed VARCHAR(500);
        DECLARE crimeCursorDone BOOLEAN DEFAULT FALSE;
        DECLARE latestActivityCursorDone BOOLEAN DEFAULT FALSE;

        -- Fetch rows using a cursor
        DECLARE latestActivityCursor CURSOR FOR
            WITH LatestActivityTimestamps AS (SELECT crimeId, MAX(createdAt) AS latestActivityCreatedAt FROM Activity GROUP BY crimeId HAVING YEAR(latestActivityCreatedAt) > 2019 ORDER BY latestActivityCreatedAt DESC LIMIT _offset, _limit)
            SELECT C.id, reportedTimestamp, C.updatedAt, latestStatus, C.description, C.mappingAddress, C.location, firstName, lastName, CrimeType.description, Place.description
            FROM (SELECT id, reportedTimestamp, reportedBy, updatedAt, latestStatus, description, mappingAddress, crimeTypeId, placeId, location FROM Crime WHERE id IN (SELECT crimeId FROM LatestActivityTimestamps)) AS C
            JOIN User ON C.reportedBy = User.id
            JOIN CrimeType ON C.crimeTypeId = CrimeType.id
            JOIN Place ON C.placeId = Place.id
            ORDER BY C.updatedAt DESC;

        DECLARE crimeCursor CURSOR FOR
            SELECT C.id, reportedTimestamp, C.latestStatus, C.description, firstName, lastName, C.mappingAddress, C.location, CrimeType.description, Place.description, GROUP_CONCAT(Weapon.description) AS weaponsUsed
            FROM
                (SELECT id, reportedTimestamp, latestStatus, description, mappingAddress, location, reportedBy, crimeTypeId, placeId
                FROM Crime
                WHERE id = CASE WHEN cId IS NULL THEN id ELSE cId END
                AND crimeTypeId = CASE WHEN _crimeTypeId IS NULL THEN crimeTypeId ELSE _crimeTypeId END
                AND placeId = CASE WHEN _placeId IS NULL THEN placeId ELSE _placeId END
                AND reportedTimestamp >= CASE WHEN _dateLeft IS NULL THEN reportedTimestamp ELSE _dateLeft END
                AND reportedTimestamp <= CASE WHEN _dateRight IS NULL THEN reportedTimestamp ELSE _dateRight END
                ORDER BY id DESC LIMIT _offset, _limit) C
            JOIN User ON C.reportedBy = User.id
            JOIN CrimeType ON C.crimeTypeId = CrimeType.id
            JOIN Place ON C.placeId = Place.id
            LEFT JOIN CrimeWeapon ON C.id = CrimeWeapon.crimeId
            LEFT JOIN Weapon ON CrimeWeapon.weaponId = Weapon.id
            GROUP BY C.id
            ORDER BY C.id DESC;
        
        IF (fetchType = 'LatestActivity') THEN
            BEGIN
                DECLARE CONTINUE HANDLER FOR NOT FOUND SET latestActivityCursorDone = TRUE;
                CREATE TEMPORARY TABLE FinalLatestActivity (
                    crimeId INT,
                    reportedTimestamp TIMESTAMP,
                    latestActivityCreatedAt TIMESTAMP,
                    latestStatus VARCHAR(100),
                    crimeDescription VARCHAR(500),
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
                        _crimeId, _reportedTimestamp, _latestActivityCreatedAt, _latestStatus, _crimeDescription, _crimeAddress, _crimeLocation, _reportedByFirstName, _reportedByLastName, _crimeType, _crimePlace;

                    IF latestActivityCursorDone THEN
                        LEAVE latestActivityLoop;
                    END IF;
            
                    INSERT INTO FinalLatestActivity VALUES(_crimeId, _reportedTimestamp, _latestActivityCreatedAt, _latestStatus, _crimeDescription, _crimeAddress, _crimeLocation, _reportedByFirstName, _reportedByLastName, _crimeType, _crimePlace);
                END LOOP;
            
                -- Close the cursor
                CLOSE latestActivityCursor;
            
                SELECT * FROM FinalLatestActivity;

                DROP TEMPORARY TABLE IF EXISTS FinalLatestActivity;
            END;
        ELSEIF (fetchType = 'Crime') THEN
            BEGIN
                DECLARE CONTINUE HANDLER FOR NOT FOUND SET crimeCursorDone = TRUE;
                CREATE TEMPORARY TABLE FinalCrime (
                    crimeId INT,
                    reportedTimestamp TIMESTAMP,
                    latestStatus VARCHAR(100),
                    crimeDescription VARCHAR(500)
                    reportedByFirstName VARCHAR(255),
                    reportedByLastName VARCHAR(255),
                    crimeAddress VARCHAR(255),
                    crimeLocation POINT,
                    crimeType VARCHAR(255),
                    crimePlace VARCHAR(255),
                    weaponsUsed VARCHAR(500)
                );
        
            -- Open the cursor
                OPEN crimeCursor;
            
                crimeLoop: LOOP
                    FETCH crimeCursor INTO
                        _crimeId, _reportedTimestamp, _latestStatus, _crimeDescription, _reportedByFirstName, _reportedByLastName, _crimeAddress, _crimeLocation, _crimeType, _crimePlace, _weaponsUsed;

                    IF crimeCursorDone THEN
                        LEAVE crimeLoop;
                    END IF;
            
                    INSERT INTO FinalCrime VALUES(_crimeId, _reportedTimestamp, _latestStatus, _crimeDescription, _reportedByFirstName, _reportedByLastName, _crimeAddress, _crimeLocation, _crimeType, _crimePlace, _weaponsUsed);
                END LOOP;
            
                -- Close the cursor
                CLOSE crimeCursor;
            
                SELECT * FROM FinalCrime;

                DROP TEMPORARY TABLE IF EXISTS FinalCrime;
            END;
        END IF;
    END //

DELIMITER ;
