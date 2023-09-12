using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
	public class ParamUpdateNewEmployeeSingleInfoModel
	{
		public int UserMasterPersonID { get; set; }
		public int MasterPersonID { get; set; }
		public string? Name { get; set; }
		public string? Value { get; set; }
		public int StatusCodeNumber { get; set; } = 1;
		
	}
}
