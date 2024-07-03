DELIMITER //

CREATE TRIGGER updating_crime_status
AFTER UPDATE ON Crime
FOR EACH ROW
BEGIN
    IF NEW.latestStatus <> OLD.latestStatus THEN
        INSERT INTO Activity (crimeId, status, viewCount, createdAt, updatedAt)
        VALUES (NEW.id, NEW.latestStatus, 0, NEW.updatedAt, NEW.updatedAt);
    END IF;
END //

DELIMITER ;
