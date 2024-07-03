
## PT-1 STAGE-2 - DATABASE DESIGN

  

### CrimeGuard - Tracking live crimes in and around Urbana-Champaign

**By**: 
**Saairam Venkatesh (saairam2)**, 
**Anirudh Ragavender Ramarathnam Madhavan (ar80)**, 
**Sujithra Rajan (rajan11)**, 
**Krishna Anandan Ganesan (kag8)**

  
<hr>

<br>


This document explains the entities and their concerned relationships which we have identified for our database. In this document, we have included a UML diagram to visually demonstrate the relational schema.

  

#### ENTITIES AND ASSUMPTIONS:

  

The following are the assumptions we have come up with which determine the overall flow of control across the database:

  

##### User Entity:

- User table has the fields id, firstName, lastName, phoneNumber,email, password, gender, houseNameWithNumberBlock, addressStreet, location, createdAt, updatedAt.

- Every user has one account and are assumed to be in Urbana when reporting the crime.

- We assume that one user can report many crimes but if two users try to report the same crime, we consider it only once. This is achieved by considering the values entered for the mandatory fields of the crime data. So, the relation between user to crime is one is to many.
  
- If a user is deleted, we don't delete the crimes reported. We just show them as 'deleted_user'.

- 0 is assumed to be the id of 'deleted_user'.

##### Crime Entity:

- Crime table has id, reportedDate, reportedTime, houseNameWithNumberBlock, addressStreet, geoCode, type, placeCode, createdAt, updatedAt.

- Crime will have at least one activity, which will be created when the crime is reported.

- Each crime can have multiple weapons and its captured by CrimeWeaponRelation using crimeId and weaponCode.

- Each crime is associated with one Type which consists of id, description.

- Each crime is associated with one Place which consists of id, description.

- Each crime can have multiple activity events owing to the overall progress of the crime.

  

##### Place Entity:

- Place table contains id and description.

- Place is assumed to specify the type of location in which the crime happened. For example, whether it happened at apartment, residency, street, etc.

- Deleting a place is not allowed if there are crimes associated with it.

##### Activity Table:

- Activity table consists of id, crimeId, status, viewCount, createdAt, updatedAt.

- There will be multiple entries for every incident that is reported in the activity i.e., each crime will have multiple instances of activity

- There will be multiple notifications for every activity to the user with id, bannerContent, bannerNavigation, createdAt, updatedAt

- Status of incidents are assumed to be one of REPORTED,ONGOING, FALSE ALARM or RESOLVED.

- The view count stored is assumed to be the user count in geofence during the specific activity.

- Deleting a user or crime will delete the associated acitivities.

##### Comment Relation:

- Comment table consists of id, crimeId, userId, body, createdAt, updatedAt.

- Each crime can have multiple comments.

- Each comment is assumed to be created by one user.

- Each user can give multiple comments.

- Deleting a post will delete all the associated comments.  

##### Type Entity:

- Type table consists of id, description and category.

- Each crime is assumed to be of only one type, even if multiple types could be associated with the crime.
  
- Deleting a type is not allowed if there are crimes associated with it.

##### Weapon Entity:

- Weapon table consists of id and description.

- Weapon is assumed to be not associated to a specific crime, but the list of weapons used in the crime.

- Multiple weapons can be used in a specific crime. This results in a many-many relationship between Crime and Weapon

- Deleting a weapon is not allowed if there are crimes associated with it.

##### Notification Relation:

- Notification table consists of id, bannerContent, bannerNavigation, createdAt, updatedAt.

- We assume one notification to be fired for every activity provided the user is within the geofence at the time of activity initiation.

- There can be one or more notifications for every user

- Deleting a user or a crime will delete all the notifications associated to that user or crime.

#### Subsriber Relation:

- Subscriber relation consists of userId, crimeId.

- Multiple users can subscribe to a single crime.


#### UML DIAGRAM:

![uml diagram](./wireframes/UML%20Diagram.png)

#### ENTITIES:

  

-  **User**(id (PK), firstName, lastName, email, phoneNumber, password, houseNumberWithBlock, addressStreet, gender, location, createdAt, updatedAt)

-  **Activity**(id (PK), crimeId (FK), status, viewCount, createdAt, updatedAt)

-  **Crime**(id (PK), reportedDate, reportedTime, houseNameWithNumberBlock, addressStreet, geoCode, type (FK), placeCode (FK), createdAt, udpatedAt)

-  **Type**(id (PK), description, category)

-  **Place**(id (PK), description)

-  **Weapon**(id (PK), description)

-  **Comment**(id (PK), crimeId (FK), user (FK), body, createdAt, updatedAt)

#### FUNCTIONAL DEPENDENCIES:

**User**:

- id &rarr; firstName, lastName, email, phoneNumber, password, houseNumberWithBlock, addressStreet, gender, location, createdAt, updatedAt

**Activity**:

- id &rarr; crimeId (FK), status, viewCount, createdAt, updatedAt

**Crime**:

- id &rarr; reportedDate, reportedTime, houseNameWithNumberBlock, addressStreet, geoCode, type (FK), placeCode (FK), createdAt, updatedAt

**Notification**:

- id &rarr; userId (FK), activityId (FK), bannerContent, bannerNotification, createdAt, updatedAt

**Type**:  

- id &rarr; description
 

**Place**:
 
- id &rarr; description
  
**Weapon**:

- id &rarr; description

**Comment**:

- id &rarr; crimeId (FK), userId (FK), body, createdAt, updatedAt


#### NORMALIZATION OF IDENTIFIED FUNTIONAL DEPENDENCIES:


The above set of functional dependencies are final and it adheres to 3NF for the following reasons:

- All the tables listed above as FD’s are uniquely identified by their own primary keys which is a minimal superkey.

- None of the attributes on the right side are primary keys by itself

**1NF:** The functional dependencies above satisfy the First Normal Form as there are no multi-valued attributes.

**2NF:** No entities possess partial dependency and hence Second Normal Form is also satisfied.

**3NF:** We initially had *Type, typeDescription, placeCode* and *placeDescription* within the Crime table. However, having these data in the same table, might result in storing redundant data, update, and delete anomalies. For example, if two crimes are reported under the same crime type, we would unnecessarily store the same description information for the two entries. Also, if we update the description of the crime type under one crime, it wouldn’t be reflected in the other crime entry. Similarly, if we want to delete a crime type we have to delete both the crime entries, but this causes losing unnecessary data. 


- The non-prime attributes are *Type, TypeDescription, placeCode, placeDescription, weaponCode* and *weaponDescription*. 

- The table implies *Type* determines *TypeDescription* and *placeCode* determines *placeDescription*. Due to the presence of transitive dependency (dependency of non-prime attributes on other non-prime attributes), this table doesn’t satisfy 3NF. 

- To achieve 3NF, we divided the Crime table into *Type* and *Place*.
  - Type: id, description
  - Place: id, description

After removing transitive dependencies, the final relations are:

**Crime:**

`R1(id, phoneNumber, reportedDate, reportedTime, houseNameWithNumberBlock, addressStreet, geoCode, createdAt, updatedAt)` 

**Type:**

`R2(id,description)`

**Place:**

`R3(id,description)`

Now, all relations are in 3NF as they don't have any transitive dependencies.
  
#### REASON FOR CHOOSING 3NF OVER BCNF:

  Each table in our database is equipped with distinct primary keys that uniquely identify every tuple within the table. There are no partial dependencies present. Any transitive dependencies that emerged were resolved in accordance with the 3NF rules. Furthermore, there are no instances where a tuple requires identification by two primary keys, constituting a composite key. Consequently, there are no violations of BCNF since no such scenarios have arisen.

  
  

#### RELATIONAL SCHEMA:


Following is the relational schema derived after normalizing the identified functional dependancies:


-  **User**(id:integer [PK], firstName:varchar(100), lastName:varchar(100),phoneNumber:integer(10),email:varchar(100),password:varchar(100),gender:varchar(10),houseNameWithNumberBlock:varchar(100),addressStreet:varchar(100), location:geometry, createdAt:timestamp, updatedAt:timestamp).

-  **Crime**(id:integer [PK], reportedDate:date, reportedTimestamp:timestamp, description: varchar(100), mappingAddress: varchar(100), location: point, latestStatus: varchar(100), reportedBy:integer [FK to User.id], crimeTypeId: integer [FK to CrimeType.id], placeId:integer [FK to Place.id], createdAt:timestamp, updatedAt:timestamp).

-  **Place**(id:varchar(100) [PK], description:varchar(100)).

-  **Comment**(id:integer [PK], crimeId:integer [FK to Crime.id], userId:integer [FK to User.id],body:varchar(500),createdAt:timestamp, updatedAt:timestamp).

-  **Activity**(id:integer [PK], crimeId:integer [FK to Crime.Id], status:varchar(100), viewCount:integer, createdAt:timestamp, updatedAt:timestamp).

-  **Weapon**(id:varchar(100) [PK], description:varchar(100)).

-  **CrimeType**(id:varchar(100) [PK], description:varchar(100)).

-  **CrimeWeapon**(weaponId:int [FK to Weapon.id], crimeId:int [FK to Crime.id]).

-  **Notification**(userId:integer [PK][FK to User.id], activityId:integer [PK][FK to Activity.id], bannerContent:varchar(100),bannerNavigation:varchar(100), createdAt:timestamp, updatedAt:timestamp).

-  **Subscription**(crimeId:integer [PK][FK to Crime.id], userId:integer [PK][FK to User.id]).