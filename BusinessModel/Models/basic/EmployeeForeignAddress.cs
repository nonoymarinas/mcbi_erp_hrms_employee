using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
    public class ForeignAddress
    {
        public int ID { get; set; }
        public int PostalAddressTypeID { get; set; }
        public string? PostalAddressType { get; set; }
        public string? ForeignCompleteAddress { get; set; }
    }
}
