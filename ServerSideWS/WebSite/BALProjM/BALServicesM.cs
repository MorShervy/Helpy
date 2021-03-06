﻿using DALProjM;
using DALProjM.Classes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using WebPush;

namespace BALProjM
{
    public sealed class BALServicesM
    {
        private static readonly double R_TO_CHECK = 1; //km
        private static readonly double R = 6371; //km

        private static VapidDetails _keys;

        private static BALServicesM _instance;
        private static readonly object Padlock = new object();

        public static BALServicesM Instance
        {
            get
            {
                lock (Padlock)
                {
                    if (_instance == null)
                        _instance = new BALServicesM();
                    return _instance;
                }
            }
        }

        private BALServicesM()
        {
            _keys = VapidHelper.GenerateVapidKeys();
        }

        public string GetKey()
        {
            if (_keys == null)
            {
                _keys = VapidHelper.GenerateVapidKeys();
            }
            return _keys.PublicKey;
        }

        public object UserExist(string phone)
        {
            DataTable result = DALServicesM.UserExist(phone);
            if (result == null)
                return null;

            if (result.Columns.Count > 1)
            {
                User user = new User
                {
                    UserID = int.Parse(result.Rows[0]["UserID"].ToString()),
                    Phone = result.Rows[0]["Phone"].ToString(),
                    Code = result.Rows[0]["Code"].ToString(),
                    Token = result.Rows[0]["Token"].ToString(),
                    CreatedDate = result.Rows[0]["CreatedDate"].ToString(),
                };
                return new JavaScriptSerializer().Serialize(user);
            }
            var error = new { Error = result.Rows[0][0].ToString() };
            return new JavaScriptSerializer().Serialize(error);
        }

        public object Register(string phone, string code, string token, string createdDate)
        {
            DataTable result = DALServicesM.Register(phone, code, token, createdDate);
            if (result == null)
                return null;

            if (result.Columns.Count > 1)
            {
                User user = new User
                {
                    UserID = int.Parse(result.Rows[0]["UserID"].ToString()),
                    Phone = result.Rows[0]["Phone"].ToString(),
                    Code = result.Rows[0]["Code"].ToString(),
                    Token = result.Rows[0]["Token"].ToString(),
                    CreatedDate = result.Rows[0]["CreatedDate"].ToString(),
                };
                return new JavaScriptSerializer().Serialize(user);
            }
            var error = new { Error = result.Rows[0][0].ToString() };
            return new JavaScriptSerializer().Serialize(error);
        }

        public object Login(string id, string code)
        {
            DataTable result = DALServicesM.Login(id, code);
            if (result == null)
                return null;

            if (result.Columns.Count > 1)
            {
                User user = new User
                {
                    UserID = int.Parse(result.Rows[0]["UserID"].ToString()),
                    Phone = result.Rows[0]["Phone"].ToString(),
                    Code = result.Rows[0]["Code"].ToString(),
                    Token = result.Rows[0]["Token"].ToString(),
                    CreatedDate = result.Rows[0]["CreatedDate"].ToString(),
                };
                return new JavaScriptSerializer().Serialize(user);
            }
            var error = new { Error = "something went wrong" };
            return new JavaScriptSerializer().Serialize(error);
        }

        public object GetDailyReportsByLocation(string lat1, string lon1)
        {
            
            DataTable table = DALServicesM.GetDailyReportsByLocation(lat1, lon1);
            List<DailyReport> report = null;
            double lat2, lon2;

            if (table.Columns.Count <= 1)
            {
                var error = new { Error = table.Rows[0][0].ToString() };
                return new JavaScriptSerializer().Serialize(error);
            }

            foreach (DataRow row in table.Rows)
            {
                lat2 = double.Parse(row["Latitude"].ToString());
                lon2 = double.Parse(row["Longitude"].ToString());
                if (IsDiffBetweenTwoGivenPointsLessThanRadiusToCheck(double.Parse(lat1), double.Parse(lon1), lat2, lon2))
                {
                    if (report == null)
                        report = new List<DailyReport>();

                    report.Add(new DailyReport()
                    {
                        ID = int.Parse(row["ReportID"].ToString()),
                        TypeID = int.Parse(row["ReportTypeID"].ToString()),
                        TypeName = row["TypeName"].ToString(),
                        Date = row["ReportDate"].ToString(),
                        Time = row["ReportTime"].ToString(),
                        Latitude = lat2,
                        Longitude = lon2,
                        Info = row["ReportInfo"].ToString(),
                        ReportStatus = (ReportStatus)Enum.Parse(typeof(ReportStatus),row["ReportStatus"].ToString()),
                    });
                }
            }
            return new JavaScriptSerializer().Serialize(report);
        }

        private static bool IsDiffBetweenTwoGivenPointsLessThanRadiusToCheck(double lat1, double lon1, double lat2, double lon2)
        {
            double radLat1 = lat1 * Math.PI / 180;
            double radLon1 = lon1 * Math.PI / 180;
            double radLat2 = lat2 * Math.PI / 180;
            double radLon2 = lon2 * Math.PI / 180;

            double diff = Math.Acos(
                            Math.Sin(radLat1) * Math.Sin(radLat2) +
                            Math.Cos(radLat1) * Math.Cos(radLat2) *
                            Math.Cos((radLon1) - (radLon2))) * R;

            return diff <= R_TO_CHECK;
        }

        public static void UpdatePushNotificationToken(string phone, string token)
        {
            DALServicesM.UpdatePushNotificationToken(phone, token);
        }

        public object InsertReport(int userId, int reportTypeId, string reportDate, string reportTime, string lat, string lon, int isVictim, string reportInfo)
        {
            DataTable result = DALServicesM.InsertReport(userId, reportTypeId, reportDate, reportTime, lat, lon, isVictim, reportInfo);

            if (result == null)
                return null;

            if (result.Columns.Count > 1)
            {
                Report report = new Report
                {
                    ReportID = int.Parse(result.Rows[0]["ReportID"].ToString()),
                    UserID = int.Parse(result.Rows[0]["UserID"].ToString()),
                    ReportTypeID = int.Parse(result.Rows[0]["ReportTypeID"].ToString()),
                    ReportDate = result.Rows[0]["ReportDate"].ToString(),
                    ReportTime = result.Rows[0]["ReportTime"].ToString(),
                    Latitude = result.Rows[0]["Latitude"].ToString(),
                    Longitude = result.Rows[0]["Longitude"].ToString(),
                    IsVictim = bool.Parse(result.Rows[0]["IsVictim"].ToString()),
                    ReportInfo = result.Rows[0]["ReportInfo"].ToString(),
                    ReportStatus = (ReportStatus)Enum.Parse(typeof(ReportStatus),result.Rows[0]["ReportStatus"].ToString()),
                };
                return new JavaScriptSerializer().Serialize(report);
            }
            var error = new { Error = result.Rows[0][0].ToString() };
            return new JavaScriptSerializer().Serialize(error);
        }



        public static Admin AdminLogin(string username, string password)
        {
            Admin a = DALServicesM.AdminLogin(username, password);

            return a;
        }

        public static string InsertAdmin(string username, string password)
        {
            Admin admin = DALServicesM.InsertAdmin(username, password);

            return new JavaScriptSerializer().Serialize(admin);
        }

        public static string UpdateAdmin(int adminId, string username, string password)
        {
            Admin admin = DALServicesM.UpdateAdmin(adminId, username, password);

            return new JavaScriptSerializer().Serialize(admin);
        }

        public static string DeleteAdmin(int adminId, string username)
        {
            string response = DALServicesM.DeleteAdmin(adminId, username);

            return new JavaScriptSerializer().Serialize(response);
        }

        public static string GetDTBAdmin()
        {
            List<Admin> a = DALServicesM.GetDTBAdmin();

            return new JavaScriptSerializer().Serialize(a);
        }

        public static string InsertUser(string phone, string code, string token, string createdDate)
        {
            string retStr = DALServicesM.InsertUser(phone, code, token, createdDate);

            return new JavaScriptSerializer().Serialize(retStr);
        }
        public static string UserLogin(string phone, string code)
        {
            User u = DALServicesM.UserLogin(phone, code);

            return new JavaScriptSerializer().Serialize(u);
        }

        public static string UpdateUser(int userId, string phone, string code)
        {
            User user = DALServicesM.UpdateUser(userId, phone, code);

            return new JavaScriptSerializer().Serialize(user);
        }

        public static string DeleteUser(int userId, string phone)
        {
            string msg = DALServicesM.DeleteUser(userId, phone);

            return new JavaScriptSerializer().Serialize(msg);
        }

        public static string GetDTBUser()
        {
            List<User> user = DALServicesM.GetDTBUser();

            return new JavaScriptSerializer().Serialize(user);
        }

        public static string GetDTBReports()
        {
            List<Report> report = DALServicesM.GetDTBReports();

            return new JavaScriptSerializer().Serialize(report);
        }

        public static string GetReportTypes()
        {
            List<ReportType> reportTypes = DALServicesM.GetReportTypes();

            return new JavaScriptSerializer().Serialize(reportTypes);
        }
    }
}
