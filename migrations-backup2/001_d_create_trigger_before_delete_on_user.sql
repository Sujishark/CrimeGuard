DELIMITER //

CREATE TRIGGER after_delete_user
BEFORE DELETE ON User
FOR EACH ROW
BEGIN
    UPDATE Comment SET userId = -1 WHERE userId = OLD.id;
    UPDATE Crime SET reportedBy = -1 where reportedBy = OLD.id;
END //

DELIMITER ;