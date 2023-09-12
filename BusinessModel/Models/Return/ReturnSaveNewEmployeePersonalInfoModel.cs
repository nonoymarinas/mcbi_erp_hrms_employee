using BusinessModel.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
	public class ReturnSaveNewEmployeePersonalInfoModel : DBStandardReturn
	{

		public int MasterPersonID { get; set; }
		public string? EmployeeNumber { get; set; }
		public string? FirstName { get; set; }
		public string? MiddleName { get; set; }
		public string? LastName { get; set; }
		public string? DateOfBirth { get; set; }
		public int? GenderID { get; set; }
		public string? GenderName { get; set; }
		public int? CivilStatusID { get; set; }
		public string? CivilStatusName { get; set; }
	}
}
