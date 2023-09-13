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
    public class NewEmployeeAllInformationLogic : ISaveNewEmployeePersonalInfo, IUpdateNewEmployeeSingleInfo,ISaveNewEmployeeBenifits
	{
		
		private readonly ParamSaveNewEmployeePersonalInfoModel? _personalInfo;
		private readonly ParamUpdateNewEmployeeSingleInfoModel? _singleInfo;
		private readonly ParamSaveNewEmployeeBenifitsModel? _benifits;

		public NewEmployeeAllInformationLogic(ParamSaveNewEmployeePersonalInfoModel? personalInfo)
		{
			_personalInfo = personalInfo;
		}

		public NewEmployeeAllInformationLogic(ParamUpdateNewEmployeeSingleInfoModel? singleInfo)
		{
			_singleInfo = singleInfo;
		}

		public NewEmployeeAllInformationLogic(ParamSaveNewEmployeeBenifitsModel? benifits)
		{
			_benifits = benifits;
		}

       
        async public Task<ReturnSaveNewEmployeePersonalInfoModel> SavePersonalInfo()
        {
			SaveNewEmployeePersonalInfoDataAccess dataAccessData = new(_personalInfo);
			return await dataAccessData.SavePersonalInfo();
		}

        async public Task<ReturnUpdateNewEmployeeSingleInfoModel> UpdateSingleInfo()
        {
			UpdateNewEmployeeSingleInfoDataAccess dataAccessData = new(_singleInfo);
			return await dataAccessData.UpdateSingleInfo();
		}

		

		async public Task<ReturnSaveNewEmployeeBenifitsModel> SaveBenifits()
		{
			SaveNewEmployeeBenifitsDataAccess dataAccessData = new(_benifits);
			return await dataAccessData.SaveBenifits();
		}
	}
}
