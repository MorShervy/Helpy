
/*
USE [master]
GO

Drop Database DesignHelpyDB
GO
*/

/*
CREATE DATABASE [DesignHelpyDB]
 CONTAINMENT = NONE
 ON  PRIMARY ( NAME = N'DesignHelpyDB', 
			   FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\DesignHelpyDB.mdf' ,
			   SIZE = 8192KB ,
	           MAXSIZE = UNLIMITED,
			   FILEGROWTH = 65536KB )
 LOG ON ( NAME = N'DesignHelpyDB_log',
          FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\DesignHelpyDB_log.ldf' , 
		  SIZE = 8192KB , 
		  MAXSIZE = 2048GB , 
		  FILEGROWTH = 65536KB )
COLLATE Hebrew_CI_AS
GO

USE [DesignHelpyDB]
GO
*/

USE site08
GO

------------------------------------------- יצירת טבלאות -------------------------------------------

CREATE TABLE [dbo].[DTBAdmin](
	[AdminID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[AdminUserName] [nvarchar](50) NOT NULL,
	[AdminPassword] [nvarchar](50) NOT NULL,
	);
GO

CREATE TABLE [dbo].[DTBUsers](
	[UserID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[Phone] [nvarchar](50) NOT NULL,
	[Code] [nvarchar](50) NOT NULL,
	[UToken] [nvarchar](100) NULL,
	[CreatedDate] [nvarchar](50) NULL,
	[IsActive] [bit] NULL,
	);
GO

CREATE TABLE [dbo].[DTBReportType](
	[ReportTypeID] [int] IDENTITY(1,1) NOT NULL  PRIMARY KEY,
	[TypeName] [nvarchar](20) NOT NULL,
	);
GO

CREATE TABLE [dbo].[DTBReports](
	[ReportID] [int] IDENTITY(1,1) NOT NULL  PRIMARY KEY,
	[UserID] [int] NOT NULL FOREIGN KEY REFERENCES DTBusers(UserID),
	[ReportTypeID] [int] NOT NULL FOREIGN KEY REFERENCES DTBReportType(ReportTypeID),
	[ReportDate] [date] NOT NULL,
	[ReportTime] [time](0) NOT NULL,
	[Latitude] [nvarchar](50) NOT NULL,
	[Longitude] [nvarchar](50) NOT NULL,
	[IsVictim] [bit] NOT NULL,
	[PictureSrc] [nvarchar](200) NULL,
	[AudioSrc] [nvarchar](200) NULL,
	[ReportInfo] [nvarchar](max) NULL,
	);
GO

/*
CREATE TABLE [dbo].[DTBLocations](
	[LocationID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[Latitude] [nvarchar](50) NOT NULL,
	[Longitude] [nvarchar](50) NOT NULL,
	[Country] [nvarchar](50) NULL,
	[Region] [nvarchar](50) NULL,
	[City] [nvarchar](50) NULL,
	);
GO
*/


------------------------------------------- הכנסת נתונים -------------------------------------------

INSERT INTO [DTBReportType] (TypeName) VALUES ('robbery')
INSERT INTO [DTBReportType] (TypeName) VALUES ('car accident')
INSERT INTO [DTBReportType] (TypeName) VALUES ('A fire')
INSERT INTO [DTBReportType] (TypeName) VALUES ('health')
INSERT INTO [DTBReportType] (TypeName) VALUES ('violence')
INSERT INTO [DTBReportType] (TypeName) VALUES ('kidnapping')

------------------------------------------- views -------------------------------------------

ALTER VIEW [dbo].[V_Daily_Reports]
AS	
SELECT        dbo.DTBReports.ReportID, dbo.DTBReports.ReportTypeID, dbo.DTBReportType.TypeName, dbo.DTBReports.ReportDate, dbo.DTBReports.ReportTime, dbo.DTBReports.Latitude, dbo.DTBReports.Longitude, 
                         dbo.DTBReports.ReportInfo, dbo.DTBReports.ReportStatus
FROM            dbo.DTBReports INNER JOIN
                         dbo.DTBReportType ON dbo.DTBReports.ReportTypeID = dbo.DTBReportType.ReportTypeID
WHERE        (YEAR(dbo.DTBReports.ReportDate) = YEAR(GETDATE())) AND (MONTH(dbo.DTBReports.ReportDate) = MONTH(GETDATE())) AND (DAY(dbo.DTBReports.ReportDate) = DAY(GETDATE()))
GO


SELECT * FROM V_Daily_Reports
WHERE (ReportDate = '2019-06-26')
------------------------------------------- פרוצדרות -------------------------------------------

ALTER PROC [dbo].[DailyReports]
AS
	IF EXISTS (SELECT * FROM V_Daily_Reports)
		BEGIN
			SELECT * FROM V_Daily_Reports
		END
	ELSE
		BEGIN
			SELECT 'לא נמצאו דיווחים באיזור' AS Error
		END
GO

EXEC [DailyReports]
GO

ALTER PROC [dbo].[UserExist] (
	@Phone nvarchar(50)
)
AS
BEGIN
	IF NOT EXISTS (SELECT * FROM DTBUsers WHERE Phone = @Phone)
		BEGIN
			SELECT 'user not exist' AS Error 
		END
	ELSE
		BEGIN
			SELECT * FROM DTBUsers WHERE Phone = @Phone
		END	
END
GO

-----TEST-----
EXEC [UserExist] '0547566757'

ALTER PROC [dbo].[Login] (
	@UserID int,
	@Code nvarchar(50)
)
AS
BEGIN
	IF EXISTS (SELECT * FROM DTBUsers WHERE UserID = @UserID AND Code = @Code)
		BEGIN
			SELECT * FROM DTBUsers WHERE UserID = @UserID
		END
	ELSE
		BEGIN
			SELECT 'wrong code' AS Error
		END
END
GO

-----TEST-----
EXEC [Login] '16','111' 


ALTER PROC [dbo].[Register] (
	@Phone nvarchar(50),
	@Code nvarchar(50),
	@Token nvarchar(100),
	@CreatedDate nvarchar(50)
	)
AS
IF NOT EXISTS (SELECT * FROM DTBUsers WHERE Phone = @Phone)
	BEGIN
		INSERT INTO DTBUsers(Phone,Code,Token,CreatedDate)
        VALUES(@Phone, @Code, @Token, @CreatedDate)
		SELECT * FROM DTBUsers WHERE UserID = @@IDENTITY
	END
ELSE
	BEGIN
		SELECT 'something went wrong :(' AS Error
		--RETURN @@ERROR
	END
GO

--tests--
 EXEC [Register] '0526832222', '1111', '',''

ALTER PROC [dbo].[UpdatePushNotificationToken] (
	@Phone nvarchar(50),
	@Token nvarchar(100)
)
AS
	UPDATE DTBUsers 
		SET Token = @Token
		WHERE Phone = @Phone
GO

---TEST---
EXEC [UpdatePushNotificationToken] '0547566757', 'NTEST'


ALTER PROC [dbo].[InsertReport] (
	@UserID int,
	@ReportTypeID int,
	@ReportDate datetime,
	@ReportTime time(0),
	@Latitude nvarchar(50),
	@Longitude nvarchar(50),
	@IsVictim bit,
	@ReportInfo nvarchar(max),
	@ReportStatus int
)
AS
	INSERT INTO DTBReports(UserID,ReportTypeID,ReportDate,ReportTime,Latitude,Longitude,IsVictim,ReportInfo,ReportStatus)
	VALUES(@UserID,@ReportTypeID,@ReportDate,@ReportTime,@Latitude,@Longitude,@IsVictim,@ReportInfo,@ReportStatus)
	SELECT * FROM DTBReports WHERE ReportID = @@IDENTITY
GO

---TEST---
EXEC [InsertReport] 1,6,'2019-06-29','21:11','32.332396','35.013177',1,'שדדו אותי - חנות מחשבים ביתית. בת חפר רחוב חיטה'
