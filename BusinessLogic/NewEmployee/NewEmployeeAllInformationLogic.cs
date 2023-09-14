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
    public class NewEmployeeAllInformationLogic : ISaveNewEmployeePersonalInfo, IUpdateNewEmployeeSingleInfo,ISaveNewEmployeeBenifits, ISaveNewEmployeeContacts,ISaveNewEmployeeJobDescriptions
	{
		
		private readonly ParamSaveNewEmployeePersonalInfoModel? _personalInfo;
		private readonly ParamUpdateNewEmployeeSingleInfoModel? _singleInfo;
		private readonly ParamSaveNewEmployeeBenifitsModel? _benifits;
		private readonly ParamSaveNewEmployeeContactsModel? _contacts;
		private readonly ParamSaveNewEmployeeJobDescriptionsModel? _jobDescriptions;

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

		public NewEmployeeAllInformationLogic(ParamSaveNewEmployeeContactsModel? contacts)
		{
			_contacts = contacts;
		}

		public NewEmployeeAllInformationLogic(ParamSaveNewEmployeeJobDescriptionsModel? jobDescriptions)
		{
			_jobDescriptions = jobDescriptions;
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

		async public Task<ReturnSaveNewEmployeeContactsModel> SaveContacts()
		{
			SaveNewEmployeeContactsDataAccess dataAccessData = new(_contacts);
			return await dataAccessData.SaveContacts();
		}

		async public Task<ReturnSaveNewEmployeeJobDescriptionsModel> SaveJobDescriptions()
        {
			SaveNewEmployeeJobeDescriptionsDataAccess dataAccessData = new(_jobDescriptions);
			return await dataAccessData.SaveJobDescriptions();
		}
    }
}
