using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DALProjM
{
    public class Report
    {
        public int ReportID { get; set; }
        public int UserID { get; set; }
        public int ReportTypeID { get; set; }
        public string ReportDate { get; set; }
        public string ReportTime { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public bool IsVictim { get; set; }
        public string PictureSrc { get; set; }
        public string AudioSrc { get; set; }
        public string ReportInfo { get; set; }
        public ReportStatus ReportStatus { get; set; }
    }

    public enum ReportStatus
    {
        InProceses = 1,
        Recieved = 2,
        Ended = 3
    }
}
