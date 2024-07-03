## How to?

### Pre-reqs
- Install docker onto your system
- Install Nodejs runtime on your system
- Use a client like pgadmin / tableplus to view and manage sql data 

### Start the project

``` 
docker-compose up -d
```
### Execute commands in mysql instance 

Exec into the container
```
docker exec -it fa23-cs411-team035-chambanaguild-mysql-container-1 bash
 ```
Login to mysql and enter the password on the prompt

```
mysql -u root -p 
```


## Questions and TODO's

- On delete cascade is not applied to tables with foreign keys for ease of developement
- Postgres has the location datatype but mysql doesnt, how do we store location data?

## TO note
insert crime type, place as csv into sql client
insert crime_filtered.csv after that
Do Regex for places containing 's in the crime query, replace with vs code find and replace