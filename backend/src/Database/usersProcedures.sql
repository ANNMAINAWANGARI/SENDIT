----CREATE TABLE users (
--id VARCHAR(80) NOT NULL PRIMARY KEY , 
--firstName varchar(255) NOT NULL,
--lastName varchar(255) NOT NULL, 
--"email" varchar(255) UNIQUE NOT NULL, 
--role varchar(255) NOT NULL DEFAULT 'user', 
--password varchar(255) NOT NULL)


--CREATE PROCEDURE insertUser(
--@id VARCHAR(80),
--@firstName VARCHAR(255),
--@lastName VARCHAR(255),
--@email VARCHAR(255),
--@password VARCHAR(255)
--)
--AS
--BEGIN
--INSERT INTO dbo.users(id,firstName,lastName,email,password)
--VALUES(@id,@firstName,@lastName,@email,@password)
--END


--CREATE PROCEDURE updateUser(
--@id VARCHAR(80),
--@firstName VARCHAR(255),
--@lastName VARCHAR(255),
--@email VARCHAR(255),
--@password VARCHAR(255))
--AS
--BEGIN
--UPDATE dbo.users
--SET 
--firstName=@firstName, 
--lastName=@lastName,
--email=@email, 
--password=@password
--WHERE 
--id=@id
--END


--CREATE PROCEDURE getUser(@email VARCHAR (255))
--AS
--BEGIN
--SELECT * FROM dbo.users
--WHERE email=@email
--END