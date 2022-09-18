/*--Create Table--*/

--CREATE  TABLE ParcelsTable(
--parcel_id VARCHAR (200) PRIMARY KEY NOT NULL,
--parcel_type VARCHAR(200) NOT NULL,
--parcel_destination VARCHAR(200) NOT NULL,
--parcel_origin VARCHAR (200) NOT NULL,
--parcel_destination_phone VARCHAR (200) NOT NULL,
--parcel_origin_phone VARCHAR (200) NOT NULL,
--parcel_weight INT NOT NULL,
--parcel_status VARCHAR (200) NOT NULL,
--is_deleted BIT NOT NULL DEFAULT 0
--)
/*--Create table--*/


/*---InsertUpdateProcedure---*/
-- CREATE PROCEDURE insertUpdateParcel(
--@parcel_id VARCHAR(200),
--@parcel_type VARCHAR(200),
--@parcel_destination VARCHAR(200),
--@parcel_origin VARCHAR (200),
--@parcel_destination_phone VARCHAR (200),
--@parcel_origin_phone VARCHAR (200),
--@parcel_weight INT,
--@parcel_status VARCHAR (200))
--AS
--BEGIN
--DECLARE @variableId BIT

--SELECT @variableId =COUNT(parcel_id) FROM ParcelsTable WHERE parcel_id=@parcel_id

--IF @variableId=0
--BEGIN

--INSERT INTO ParcelsTable(parcel_id,parcel_type,parcel_destination,parcel_origin,parcel_destination_phone,parcel_origin_phone,parcel_weight,parcel_status)
--VALUES(@parcel_id,@parcel_type,@parcel_destination,@parcel_origin,@parcel_destination_phone,@parcel_origin_phone,@parcel_weight,@parcel_status)
--END
--ELSE 
--BEGIN
--UPDATE [ParcelsTable]
--SET
--parcel_status=@parcel_status
--WHERE parcel_id=@parcel_id
--END
--END
/*---InsertUpdateProcedure---*/



/*---Get all parcels----*/
--CREATE PROCEDURE getParcels
--AS
--BEGIN
--SELECT * FROM ParcelsTable WHERE is_deleted=0;
--END
/*---Get all parcels---*/


/*---Get single parcel---*/
--CREATE PROCEDURE getParcel(@parcel_id VARCHAR (200))
--AS
--BEGIN
--SELECT * FROM ParcelsTable
--WHERE parcel_id=@parcel_id
--END
/*---Get single parcel---*/

/*---soft delete---*/

/*---soft delete---*/

/*receiver parcels*/
--CREATE OR ALTER PROCEDURE getReceiverParcels(@parcel_destination_phone VARCHAR(200))
--AS
--BEGIN
--SELECT * FROM ParcelsTable
--WHERE parcel_destination_phone=@parcel_destination_phone AND is_deleted=0;
--END
/*receiver parcels*/

/*sender parcels*/
--CREATE OR ALTER PROCEDURE getSenderParcels(@parcel_origin_phone VARCHAR(200))
--AS
--BEGIN
--SELECT * FROM ParcelsTable
--WHERE parcel_origin_phone=@parcel_origin_phone AND is_deleted=0;
--END
/*sender parcels*/