using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
	public class ParamSaveNewEmployeeBenifitsModel
	{
		public int? UserMasterPersonID { get; set; }
		public int? MasterPersonID { get; set; }
		public string? SssNumber { get; set; }
		public string? PhilHealthNumber { get; set; }
		public string? PagIbigNumber { get; set; }
		public string? TinNumber { get; set; }
		
	}
}
