using BusinessModel.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
	public class ReturnUpdateNewEmployeeSingleInfoModel : DBStandardReturn
	{
		public int MasterPersonID { get; set; }
		public string? Name { get; set; }
		public string? Value { get; set; }
	}
}
