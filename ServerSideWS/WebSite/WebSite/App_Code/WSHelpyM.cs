using BALProjM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for WSHelpyM
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WSHelpyM : System.Web.Services.WebService
{

    public WSHelpyM()
    {
        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld()
    {
        return "Hello World";
    }

    [WebMethod]
    public object UserExist(string phone)
    {
        return BALServicesM.Instance.UserExist(phone);
    }

    [WebMethod]
    public object RegisterAndLogin(string phone, string code, string token, string createdDate)
    {
        return BALServicesM.Instance.RegisterAndLogin(phone, code, token, createdDate);
      
    }







    [WebMethod]
    public string AdminLogin(string username, string password)
    {
        return BALServicesM.AdminLogin(username, password);
    }

    [WebMethod]
    public string InsertAdmin(string username, string password)
    {
        return BALServicesM.InsertAdmin(username, password);
    }

    [WebMethod]
    public string UpdateAdmin(int adminId, string username, string password)
    {
        return BALServicesM.UpdateAdmin(adminId, username, password);
    }

    [WebMethod]
    public string DeleteAdmin(int adminId, string username)
    {
        return BALServicesM.DeleteAdmin(adminId, username);
    }

    [WebMethod]
    public string GetDTBAdmin()
    {
        return BALServicesM.GetDTBAdmin();
    }

    [WebMethod]
    public string InsertUser(string phone, string code, string token, string createdDate)
    {
        return BALServicesM.InsertUser(phone,code,token,createdDate);
    }

    [WebMethod]
    public string UserLogin(string phone, string code)
    {
        return BALServicesM.UserLogin(phone, code);
    }

    [WebMethod]
    public string UpdateUser(int userId, string phone, string code)
    {
        return BALServicesM.UpdateUser(userId, phone, code);
    }

    [WebMethod]
    public string DeleteUser(int userId,string phone)
    {
        return BALServicesM.DeleteUser(userId, phone);
    }

    [WebMethod]
    public string GetDTBUser()
    {
        return BALServicesM.GetDTBUser();
    }

    [WebMethod]
    public string GetDTBReports()
    {
        return BALServicesM.GetDTBReports();
    }

    [WebMethod]
    public string GetDTBReportType()
    {
        return BALServicesM.GetReportTypes();
    }
}
