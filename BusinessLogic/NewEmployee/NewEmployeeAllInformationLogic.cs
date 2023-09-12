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
    public class NewEmployeeAllInformationLogic : ISaveNewEmployeePersonalInfo
	{
		
		private readonly ParamSaveNewEmployeePersonalInfoModel? _personalInfo;

		public NewEmployeeAllInformationLogic(ParamSaveNewEmployeePersonalInfoModel? personalInfo)
		{
			_personalInfo = personalInfo;
		}

        async public Task<ReturnSaveNewEmployeePersonalInfoModel> SavePersonalInfo()
        {
			SaveNewEmployeePersonalInfoDataAccess dataAccessData = new(_personalInfo);
			return await dataAccessData.SavePersonalInfo();
		}

       
    }
}
