using BusinessModel.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
	public class ReturnGetEmployeeDataByIDModel : DBStandardReturn
	{
		public PersonalInformation? PersonalInfo { get; set; }
		public Benifits? Benifits { get; set; }
		public Contacts? Contacts { get; set; }
		public Compensations? Compensation { get; set; }
		public Country? EmployeeAddressCountry { get; set; }
		public PhilippineAddress? PhilippineAddress { get; set; }
		public ForeignAddress? ForeignAddress { get; set; }
		public JobDescription? JobDescription { get; set; }
		public List<Gender>? GenderList { get; set; }
		public List<Country>? CountryList { get; set; }
		public List<Region>? RegionList { get; set; }
		public List<Province>? ProvinceList { get; set; }
		public List<City>? CityList { get; set; }
		public List<Position>? PositionList { get; set; }
		public List<Department>? DepartmentList { get; set; }
		public List<RatePeriod>? RatePeriodList { get; set; }
		public List<SalaryCondition>? SalaryConditionList { get; set; }



	}
}
