using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DALProjM.Classes
{
    public class DailyReport
    {
        public int ID { get; set; }
        public int TypeID { get; set; }
        public string TypeName { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Info { get; set; }
    }
}
