using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
	public class ParamSaveNewEmployeeCompensationsModel
	{
		public int? UserMasterPersonID { get; set; }
		public int? MasterPersonID { get; set; }
		public string? RatePeriod { get; set; }
		public string? BasicSalary { get; set; }
		public string? Allowance { get; set; }
		public string? SalaryCondition { get; set; }
		
	}
}
