using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
	public class ParamEmployeeInfoAttr
	{
		public int MasterPersonID { get; set; }
		public string? Name { get; set; }
		public string? Value { get; set; }
		public int StatusCodeNumber { get; set; } = 1;
	}
}
