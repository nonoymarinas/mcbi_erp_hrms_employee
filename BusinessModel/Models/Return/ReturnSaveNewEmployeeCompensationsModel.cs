using BusinessModel.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
	public class ReturnSaveNewEmployeeCompensationsModel : DBStandardReturn
	{
		public string? RatePeriodName { get; set; }
		public int? RatePeriodID { get; set; }
		public string? BasicSalary { get; set; }
		public string? Allowance { get; set; }
		public string? SalaryConditionName { get; set; }
		public int? SalaryConditionID { get; set; }
	}
}
