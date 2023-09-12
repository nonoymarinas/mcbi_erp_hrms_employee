using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
	public class ParamSaveNewEmployeePersonalInfoModel
	{
		public int? UserMasterPersonID { get; set; }
		public string? FirstName { get; set; }
		public string? MiddleName { get; set; }
		public string? LastName { get; set; }
		public string? DateOfBirth { get; set; }
		public int? CivilStatus { get; set; }
		public int? Gender { get; set; }
	}
}
