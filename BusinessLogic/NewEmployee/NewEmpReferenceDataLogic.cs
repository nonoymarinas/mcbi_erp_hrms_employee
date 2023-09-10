using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using BusinessModel;
using DataAccess;

namespace BusinessLogic
{
	public class NewEmpReferenceDataLogic : IGetNewEmployeeRefData
	{
        async public Task<ReturnNewEmpReferenceDataModel> GetReferenceData()
        {
			NewEmployeeReferenceDataAccess dataAccessData = new();
			return await dataAccessData.GetReferenceData();
		}

	}
}
