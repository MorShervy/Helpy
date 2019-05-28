

insert into DTBReports(UserID,ReportTypeID,ReportDate,ReportTime,Latitude, Longitude, IsVictim, PictureSrc,AudioSrc,ReportInfo)
values(2,1,CONVERT(datetime, getdate(),103),CONVERT(time(0), getdate()),32.381037,34.8643711,0,null,null,null)
go

UPDATE DTBAdmin
SET AdminUserName= 'admin1' , AdminPassword = '111',
where AdminID = 1