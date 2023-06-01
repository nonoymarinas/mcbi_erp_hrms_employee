using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
    public class CompanyLoginDataDataModel
    {
        public int CompanyID { get; set; }
        public string? CompanyDisplayName { get; set; }
        public string? ActiveText { get; set; }
        public string? DisabledText { get; set; }
        public string? InputBorder { get; set; }
        public string? MainHeaderBackGround { get; set; }
        public string? MainHeaderText { get; set; }
        public string? MainTitleText { get; set; }
        public string? PageBackGround { get; set; }
        public string? SubTitleText { get; set; }
        public string? CompanyLogoURL { get; set; }
        public string? ConnectionString { get; set; }

    }
}
