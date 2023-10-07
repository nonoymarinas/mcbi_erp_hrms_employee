using BusinessModel.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
	public class ReturnSaveNewEmployeeEmploymentsModel : DBStandardReturn
	{
		public int? PositionID { get; set; }
		public string? PositionName { get; set; }
		public string? DepartmentName { get; set; }
        public int? DepartmentID { get; set; }
        public string? ProjectAssignment { get; set; }
        public int? ProjectAssignmentID { get; set; }
        public string? DateHired { get; set; }
        public string? Remarks { get; set; }
	}
}
