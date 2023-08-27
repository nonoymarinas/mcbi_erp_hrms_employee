using BusinessModel.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
	public class ReturnBarangayListByCityIDModel : DBStandardReturn
	{
		public List<Barangay>? BarangayList { get; set; }
	}
}
