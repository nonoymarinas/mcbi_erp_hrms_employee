using BusinessModel.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
	public class ReturnNewEmpReferenceDataModel : DBStandardReturn
	{
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
