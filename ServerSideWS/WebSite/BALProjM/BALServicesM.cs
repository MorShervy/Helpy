using DALProjM;
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
            var error = new { Error = result.Rows[0][0].ToString() };
            return new JavaScriptSerializer().Serialize(error);
        }

        public object GetDailyReportsByLocation(string lat1, string lon1)
        {
            List<DailyReport> t = DALServicesM.GetDailyReportsByLocation(lat1, lon1);
            return new JavaScriptSerializer().Serialize(t);
        }


        public static void UpdatePushNotificationToken(string phone, string token)
        {
            DALServicesM.UpdatePushNotificationToken(phone, token);
        }

        public static string AdminLogin(string username, string password)
        {
            Admin a = DALServicesM.AdminLogin(username, password);

            return new JavaScriptSerializer().Serialize(a);
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
