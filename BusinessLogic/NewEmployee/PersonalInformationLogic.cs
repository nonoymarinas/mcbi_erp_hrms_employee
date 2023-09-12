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
    public class PersonalInformationLogic:ISavePersonalInfo, IUpdatePersonalInfo
	{
		
		private readonly ParamPersonalInfoModel? _personalInfo;
		private readonly ParamUpdatePersonalInfoModel? _updatepersonalInfo;

		public PersonalInformationLogic(ParamPersonalInfoModel personalInfo)
		{
			
			_personalInfo = personalInfo;
		}

		public PersonalInformationLogic(ParamUpdatePersonalInfoModel updatepersonalInfo)
		{
			_updatepersonalInfo = updatepersonalInfo;
		}

		async public Task<ReturnSavePersonalInfoModels> SavePersonalInfo()
		{
			SavePersonalInformationDataAccess dataAccessData = new(_personalInfo);
			return await dataAccessData.SavePersonalInfo();
		}

		async public Task<ReturnUpdatePersonalInfoModels> UpdatePersonalInfo()
		{
			UpdatePersonalInformationDataAccess dataAccessData = new( _updatepersonalInfo);
			return await dataAccessData.UpdatePersonalInfo();
		}

	}
}
