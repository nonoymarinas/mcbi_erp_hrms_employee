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
        public static string? BlobUrl { get;set;} = "https://speedxstorageaccount.blob.core.windows.net/speedxcontainer";
        public static string? ResourceGroup { get; set; } ="speedx_erp_resource_group";
        public static string? StorageAccount { get;set;}="speedxstorageaccount";
        public static string? BlobContainer { get;set;}="speedxcontainer";
        public static string? BlobStorageConnString { get; set; } ="DefaultEndpointsProtocol=https;AccountName=speedxstorageaccount;AccountKey=puzc+JRkjzbexfRLADIA7zK5tn7oKYphEejJ2Kfn/PVD+ZMl1/TehOONIFoXN/Ztqw5wardeBbEX+AStqXjeTw==;EndpointSuffix=core.windows.net";
    }
}
