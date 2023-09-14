using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
	public class ParamSaveNewEmployeeJobDescriptionsModel
	{
		public int? UserMasterPersonID { get; set; }
		public int? MasterPersonID { get; set; }
		public string? Position { get; set; }
		public string? Department { get; set; }
		public string? Remarks { get; set; }
		
	}
}
