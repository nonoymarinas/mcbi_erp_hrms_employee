using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
    public class AzureStorageAccountsOptions
    {
        public  string? Url { get; set; }
        public  string? ResourceGroup { get; set; } 
        public  string? StorageAccount { get; set; } 
        public  string? Container { get; set; } 
        public  string? ConnectionString { get; set; }
    }
}
