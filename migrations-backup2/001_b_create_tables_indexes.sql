CREATE INDEX idx_reportedTimestamp ON Crime (reportedTimestamp);

ALTER TABLE Crime ADD INDEX idx_reportedBy (reportedBy);
ALTER TABLE Crime ADD INDEX idx_crimeTypeId (crimeTypeId);
ALTER TABLE Crime ADD INDEX idx_placeId (placeId);

ALTER TABLE Activity ADD INDEX idx_crimeId (crimeId);
ALTER TABLE Activity ADD INDEX idx_createdAt (createdAt);

ALTER TABLE Comment ADD INDEX idx_crimeId (crimeId);
ALTER TABLE Comment ADD INDEX idx_userId (userId);