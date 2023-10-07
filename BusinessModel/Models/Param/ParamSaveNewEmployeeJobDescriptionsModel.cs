using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
	public class ParamSaveNewEmployeeJobEmploymentModel
	{
		public int? UserMasterPersonID { get; set; }
		public int? MasterPersonID { get; set; }
		public string? Position { get; set; }
		public string? Department { get; set; }
        public string? DateHired { get; set; }
        public int? ProjectAssignmentID { get; set; }
        public string? Remarks { get; set; }
		
	}
}
