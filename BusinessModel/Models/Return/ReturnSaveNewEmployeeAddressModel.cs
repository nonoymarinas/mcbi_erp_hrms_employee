using BusinessModel.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
	public class ReturnSaveNewEmployeeAddressModel : DBStandardReturn
	{
		public int? CountryID { get; set; }
		public string? CountryName { get; set; }
		public int? RegionID { get; set; }
		public string? RegionName { get; set; }
		public int? ProvinceID { get; set; }
		public string? ProvinceName { get; set; }
		public int? CityID { get; set; }
		public string? CityName { get; set; }
		public int? BarangayID { get; set; }
		public string? BarangayName { get; set; }
		
		public string? AddressLine1 { get; set; }
		public string? AddressLine2 { get; set; }
	}
}
