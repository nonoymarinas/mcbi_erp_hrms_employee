using BusinessModel.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
	public class ReturnSaveNewEmployeeBenifitsModel : DBStandardReturn
	{
		public string? SssNumber { get; set; }
		public string? PhilHealthNumber { get; set; }
		public string? PagIbigNumber { get; set; }
		public string? TinNumber { get; set; }
	}
}
