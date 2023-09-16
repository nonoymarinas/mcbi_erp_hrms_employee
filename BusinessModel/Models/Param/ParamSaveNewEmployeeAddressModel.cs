using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
	public class ParamSaveNewEmployeeAddressModel
	{
		public int? UserMasterPersonID { get; set; }
		public int? MasterPersonID { get; set; }
		public int? AddressTypeID { get; set; }
		public int? CityID { get; set; }
		public int? BarangayID { get; set; }
		public string? AddressLine1 { get; set; }
		public string? AddressLine2 { get; set; }

	}
}
