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
		public PersonalInformationModel? PersonalInfo { get; set; }
		public WorkersBenifitsModel? Benifits { get; set; }
		public WorkersContactsModel? Contacts { get; set; }
		public WorkersCompensationModel? Compensation { get; set; }
		public Country? EmployeeAddressCountry { get; set; }
		public EmployeePhilippineAddress? PhilippineAddress { get; set; }
		public EmployeeForeignAddress? ForeignAddress { get; set; }
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
