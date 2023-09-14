using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
	public class ParamSaveNewEmployeeContactsModel
	{
		public int? UserMasterPersonID { get; set; }
		public int? MasterPersonID { get; set; }
		public string? MobileNumber { get; set; }
		public string? LandLineNumber { get; set; }
		public string? EmailAddress { get; set; }
		
	}
}
