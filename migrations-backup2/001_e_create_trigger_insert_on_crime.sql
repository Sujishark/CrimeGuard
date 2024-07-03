DELIMITER //

CREATE TRIGGER adding_activity
AFTER INSERT ON Crime
FOR EACH ROW
BEGIN
    INSERT INTO Activity (crimeId, status, viewCount, createdAt, updatedAt)
    VALUES (NEW.id, NEW.latestStatus, 0, NEW.createdAt, NEW.updatedAt);
END //

DELIMITER ;
