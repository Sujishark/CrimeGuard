DELIMITER //

CREATE TRIGGER after_insert_activity
AFTER INSERT ON Activity
FOR EACH ROW
BEGIN
    -- Insert new notification for every subscriber of the crime
    INSERT INTO Notification (userId, activityId, bannerContent, bannerNavigation)
    SELECT
        s.userId,
        NEW.id AS activityId,
        CONCAT(NEW.crimeID,' is now ',NEW.status) AS bannerContent,
        NEW.crimeId AS bannerNavigation
    FROM Subscription s
    WHERE s.crimeId = NEW.crimeId;
END //

DELIMITER ;