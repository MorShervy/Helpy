using DALProjM;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace DALProjM
{
    public class DALServicesM
    {
        /// <summary>
        /// Statics Class Members
        /// </summary>
        private static string conStr = null;
        private static bool local = false;
        private static SqlConnection Con = null;
        private static SqlDataAdapter _adtr = null;
        private static SqlCommand _command = null;

        /// <summary>
        /// Constructor - get connection to Local/Server
        /// </summary>
        static DALServicesM()
        {
            Configuration config = null;
            string codeBase = Assembly.GetExecutingAssembly().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);
            string path = Uri.UnescapeDataString(uri.Path);

            string exeConfigPath = path;
            try
            {
                config = ConfigurationManager.OpenExeConfiguration(exeConfigPath);
            }
            catch (Exception e)
            {
                //handle errror here.. means DLL has no sattelite configuration file.
                throw new Exception(e.Message);
            }

            if (config != null)
            {
                conStr = GetAppSetting(config, local ? "Local" : "LiveDNS");
            }

            Con = new SqlConnection(conStr);
            //_command = new SqlCommand();
            //_command.Connection = Con;
        }

        /// <summary>
        /// App Settings Configuration
        /// </summary>
        /// <param name="config">configurtaion</param>
        /// <param name="key">Local or LiveDNS</param>
        /// <returns>string - read only</returns>
        static string GetAppSetting(Configuration config, string key)
        {
            KeyValueConfigurationElement element = config.AppSettings.Settings[key];
            if (element != null)
            {
                string value = element.Value;
                if (!string.IsNullOrEmpty(value))
                    return value;
            }
            return string.Empty;
        }

        public static DataTable UserExist(string phone)
        {
            try
            {
                Con.Open();
                _command = new SqlCommand($"UserExist", Con);
                _command.CommandType = CommandType.StoredProcedure;
                _command.Parameters.Add(new SqlParameter("Phone", phone));
                _adtr = new SqlDataAdapter(_command);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "User");

                if (ds.Tables["User"].Rows.Count != 0)
                    return ds.Tables["User"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con != null && Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;
        }

        public static DataTable Register(string phone, string code, string token, string createdDate)
        {

            try
            {
                Con.Open();
                _command = new SqlCommand($"Register", Con);
                _command.CommandType = CommandType.StoredProcedure;

                /* input parameters */
                _command.Parameters.Add(new SqlParameter("Phone", phone));
                _command.Parameters.Add(new SqlParameter("Code", code));
                _command.Parameters.Add(new SqlParameter("Token", token));
                _command.Parameters.Add(new SqlParameter("CreatedDate", createdDate));
                // return result par
                //SqlParameter returnPar = new SqlParameter();
                //returnPar.Direction = ParameterDirection.ReturnValue;
                //_command.Parameters.Add(returnPar);

                _adtr = new SqlDataAdapter(_command);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "User");

                if (ds.Tables["User"].Rows.Count != 0)
                    return ds.Tables["User"];

            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;
        }

        public static DataTable Login(string id, string code)
        {
            
            try
            {
                int userId = int.Parse(id);
                Con.Open();
                _command = new SqlCommand($"Login", Con);
                _command.CommandType = CommandType.StoredProcedure;

                /* input parameters */
                _command.Parameters.Add(new SqlParameter("UserID", userId));
                _command.Parameters.Add(new SqlParameter("Code", code));
                _adtr = new SqlDataAdapter(_command);

                DataSet ds = new DataSet();
                _adtr.Fill(ds, "User");

                if (ds.Tables["User"].Rows.Count != 0)
                    return ds.Tables["User"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;
        }

        public static void UpdatePushNotificationToken(string phone, string token)
        {
            try
            {
                Con.Open();
                _command = new SqlCommand($"UPDATE DTBusers SET Token = @Token WHERE Phone = @Phone", Con);
                _command.Parameters.Add(new SqlParameter("@Token", token));
                _command.Parameters.Add(new SqlParameter("@Phone", phone));

                _command.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }

        }







        /**************************************** old *****************************************/
        /// <summary>
        /// Admin Login method
        /// </summary>
        /// <param name="username">Admin UserName</param>
        /// <param name="password">Admin Password</param>
        /// <returns>Admin</returns>
        public static Admin AdminLogin(string username, string password)
        {
            Admin admin = null;
            _command.CommandText = " select * " +
                               " from DTBAdmin " +
                               $" where AdminUserName='{username}' and " +
                               $" AdminPassword='{password}'";
            _command.Connection.Open();
            SqlDataReader reader = _command.ExecuteReader();
            if (reader.Read())
            {
                admin = new Admin()
                {
                    AdminID = (int)reader["AdminID"],
                    AdminUserName = username,
                    AdminPassword = password
                };
            }
            _command.Connection.Close();
            return admin;
        }

        /// <summary>
        /// Add New Admin To DB
        /// </summary>
        /// <param name="username">Admin UserName</param>
        /// <param name="password">Admin Password</param>
        /// <returns>Admin</returns>
        public static Admin InsertAdmin(string username, string password)
        {
            Admin admin = null;
            int adminID = -1;
            bool isAlreadyExist = false;
            SqlDataReader r1 = null;
            SqlDataReader r2 = null;

            _command = new SqlCommand($"SELECT * " +
                                  $"FROM DTBAdmin " +
                                  $"WHERE AdminUserName='{username}'");
            _command.Connection.Open();
            r1 = _command.ExecuteReader();

            if (r1.Read())
            {
                isAlreadyExist = true;
            }
            else
            {
                if (!r1.IsClosed)
                    r1.Close();

                _command.CommandText = $"SELECT TOP 1 * " +
                                   $"FROM DTBAdmin " +
                                   $"ORDER BY ID DESC";
                r2 = _command.ExecuteReader();
                if (r2.Read())
                    adminID = int.Parse(r2["ID"].ToString()) + 1;
            }

            if (!r1.IsClosed)
                r1.Close();

            if (!r2.IsClosed)
                r2.Close();

            if (!isAlreadyExist)
            {
                _command.CommandText = $"INSERT INTO DTBAdmin(AdminUserName,AdminPassword) " +
                                   $" VALUES('{username}','{password}')";
                int res = _command.ExecuteNonQuery();

                if (res == 1)
                {
                    admin = new Admin()
                    {
                        AdminID = adminID,
                        AdminUserName = username,
                        AdminPassword = password
                    };
                }
            }
            _command.Connection.Close();
            return admin;
        }

        /// <summary>
        /// update admin from DB
        /// </summary>
        /// <param name="adminId">Admin ID</param>
        /// <param name="username">Username</param>
        /// <param name="password">Password</param>
        /// <returns>Admin</returns>
        public static Admin UpdateAdmin(int adminId, string username, string password)
        {
            Admin admin = null;

            _command.CommandText = "UPDATE DTBAdmin " +
                               $" SET AdminUserName= '{username}' , AdminPassword = '{password}'" +
                               $" WHERE AdminID = {adminId};";
            try
            {
                _command.Connection.Open();
                int res = _command.ExecuteNonQuery();

                if (res == 1)
                {
                    admin = new Admin()
                    {
                        AdminID = adminId,
                        AdminUserName = username,
                        AdminPassword = password
                    };
                }
            }
            finally
            {
                _command.Connection.Close();
            }
            return admin;
        }

        /// <summary>
        /// Delete Admin from DB
        /// </summary>
        /// <param name="adminId">Admin ID</param>
        /// <param name="username"></param>
        /// <returns>string</returns>
        public static string DeleteAdmin(int adminId, string username)
        {
            string msg = null;

            try
            {
                _command.CommandText = $"DELETE FROM DTBAdmin WHERE AdminID = {adminId};";
                _command.Connection.Open();
                int res = _command.ExecuteNonQuery();

                if (res == 1)
                {
                    msg = $"Deleted Admin Id={adminId}, Name={username}";
                }
                else
                {
                    msg = "Admin is not exist!";
                }
            }
            finally
            {
                _command.Connection.Close();
            }
            return msg;
        }

        /// <summary>
        /// Get Admin Table from DB
        /// </summary>
        /// <returns>List<Admin></returns>
        public static List<Admin> GetDTBAdmin()
        {
            List<Admin> a = null;
            SqlDataReader r1 = null;

            try
            {
                _command.Connection.Open();
                _command.CommandText = "select * from DTBAdmin";
                r1 = _command.ExecuteReader();

                while (r1.Read())
                {
                    if (a == null)
                    {
                        a = new List<Admin>();
                    }

                    a.Add(new Admin()
                    {
                        AdminID = (int)r1["AdminID"],
                        AdminUserName = r1["AdminUserName"].ToString(),
                        AdminPassword = r1["AdminPassword"].ToString()
                    });
                }
            }
            finally
            {
                if (!r1.IsClosed)
                    r1.Close();
                _command.Connection.Close();
            }
            return a;
        }

        public static string InsertUser(string phone, string code, string token, string createdDate)
        {
            string retStr = null;
            _command.CommandText = "INSERT INTO DTBUsers(Phone,Code,Token,CreatedDate) " +
                                $" VALUES('{phone}', '{code}', '{token}', '{createdDate}')";

            try
            {
                _command.Connection.Open();
                int res = _command.ExecuteNonQuery();

                if (res == 1)
                {
                    retStr = "1 row affected";
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                _command.Connection.Close();
            }
            return retStr;
        }

        /// <summary>
        /// Login Users methods
        /// </summary>
        /// <param name="phone">Phone</param>
        /// <param name="code">Verification Code</param>
        /// <returns>User</returns>
        public static User UserLogin(string phone, string code)
        {
            User u = null;
            _command.CommandText = " SELECT * " + " " +
                                 " FROM DTBUsers " + "" +
                                $" WHERE Phone='{phone}' AND Code='{code}' ";
            _command.Connection.Open();
            SqlDataReader reader = _command.ExecuteReader();
            if (reader.Read())
            {
                u = new User()
                {
                    UserID = int.Parse(reader["UserID"].ToString()),
                    Phone = reader["Phone"].ToString(),
                    Code = (string)reader["Code"]
                };
            }
            _command.Connection.Close();

            return u;
        }

        /// <summary>
        /// Update User
        /// </summary>
        /// <param name="userId">User ID</param>
        /// <param name="phone">Phone number</param>
        /// <param name="code">Verification Code</param>
        /// <returns>User</returns>
        public static User UpdateUser(int userId, string phone, string code)
        {
            User user = null;

            _command.CommandText = "UPDATE DTBUsers " +
                               $" SET  Phone = '{phone}' , Code = '{code}'" +
                               $" WHERE UserID = {userId};";
            try
            {
                _command.Connection.Open();
                int res = _command.ExecuteNonQuery();

                if (res == 1)
                {
                    user = new User()
                    {
                        UserID = userId,
                        Phone = phone,
                        Code = code
                    };
                }
            }
            finally
            {
                _command.Connection.Close();
            }
            return user;
        }

        /// <summary>
        /// Delete User from DB
        /// </summary>
        /// <param name="userId">User ID</param>
        /// <param name="phone">Phone</param>
        /// <returns>string</returns>
        public static string DeleteUser(int userId, string phone)
        {
            string msg = null;

            try
            {
                _command.CommandText = $"DELETE FROM DTBUsers WHERE UserID = {userId};";
                _command.Connection.Open();
                int res = _command.ExecuteNonQuery();

                if (res == 1)
                {
                    msg = $"Deleted User Id={userId}, Phone={phone}";
                }
                else
                {
                    msg = "User is not exist!";
                }
            }
            finally
            {
                _command.Connection.Close();
            }
            return msg;
        }

        /// <summary>
        /// Get Users Table from DB
        /// </summary>
        /// <returns>List<User></returns>
        public static List<User> GetDTBUser()
        {
            List<User> user = null;
            SqlDataReader r1 = null;

            try
            {
                _command.Connection.Open();
                _command.CommandText = "select * from DTBUsers";
                r1 = _command.ExecuteReader();

                while (r1.Read())
                {
                    if (user == null)
                    {
                        user = new List<User>();
                    }

                    user.Add(new User()
                    {
                        UserID = (int)r1["UserID"],
                        Phone = r1["Phone"].ToString(),
                        Code = r1["Code"].ToString(),
                        Token = r1["Token"].ToString()
                    });
                }
            }
            finally
            {
                if (r1.IsClosed)
                    r1.Close();
                _command.Connection.Close();
            }
            return user;
        }

        /// <summary>
        /// Get Reports Table
        /// </summary>
        /// <returns>List<Report></returns>
        public static List<Report> GetDTBReports()
        {
            List<Report> report = null;
            SqlDataReader r1 = null;

            try
            {
                _command.Connection.Open();
                _command.CommandText = @"SELECT ReportID, UserID, ReportTypeID, ReportDate, ReportTime, Latitude, Longitude, IsVictim, PictureSrc, AudioSrc, ReportInfo " +
                                    " FROM dbo.DTBReports";
                r1 = _command.ExecuteReader();

                while (r1.Read())
                {
                    if (report == null)
                    {
                        report = new List<Report>();
                    }

                    report.Add(new Report()
                    {
                        ReportID = (int)r1["ReportID"],
                        UserID = (int)r1["UserID"],
                        ReportTypeID = (int)r1["ReportTypeID"],
                        ReportDate = r1["ReportDate"].ToString().Substring(0, 9),
                        ReportTime = r1["ReportTime"].ToString(),
                        Latitude = r1["Latitude"].ToString(),
                        Longitude = r1["Longitude"].ToString(),
                        IsVictim = (bool)r1["IsVictim"],
                        PictureSrc = r1["PictureSrc"].ToString(),
                        AudioSrc = r1["AudioSrc"].ToString(),
                        ReportInfo = r1["ReportInfo"].ToString()
                    });
                }
            }
            finally
            {
                if (r1.IsClosed)
                    r1.Close();
                _command.Connection.Close();
            }
            return report;
        }

        /// <summary>
        /// Get Report Type from DB
        /// </summary>
        /// <returns>List<ReportType></returns>
        public static List<ReportType> GetReportTypes()
        {
            List<ReportType> reportType = null;
            SqlDataReader r1 = null;

            try
            {
                _command.Connection.Open();
                _command.CommandText = @"SELECT * " +
                                    " FROM dbo.DTBReportType";
                r1 = _command.ExecuteReader();

                while (r1.Read())
                {
                    if (reportType == null)
                    {
                        reportType = new List<ReportType>();
                    }

                    reportType.Add(new ReportType()
                    {
                        ReportTypeID = (int)r1["ReportTypeID"],
                        TypeName = r1["TypeName"].ToString()
                    });
                }
            }
            finally
            {
                if (r1.IsClosed)
                    r1.Close();
                _command.Connection.Close();
            }
            return reportType;
        }

    }
}
