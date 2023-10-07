using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
	
	public interface ISaveNewEmployeeJobDescriptions
	{
		public Task<ReturnSaveNewEmployeeEmploymentsModel> SaveJobDescriptions();
	}
}
