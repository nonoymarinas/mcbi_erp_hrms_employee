using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
    public static class GlobalValues
    {
        public static string? ConnectionString { get; set; } = "Server=tcp:speedxserver.database.windows.net,1433;Initial Catalog=ERP_SPEEDX_DB;Persist Security Info=False;User ID=nonoymarinas;Password=Nonoy10@;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
        //public static string? ConnectionString { get; set; } = "Server=tcp:speedxserver.database.windows.net,1433;Initial Catalog=ERP_SPEEDX_DB_Development;Persist Security Info=False;User ID=nonoymarinas;Password=Nonoy10@;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

    }
}
