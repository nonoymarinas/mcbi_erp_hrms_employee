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
    public class NewEmployeeAllInformationLogic : ISaveNewEmployeePersonalInfo, IUpdateNewEmployeeSingleInfo,ISaveNewEmployeeBenifits, ISaveNewEmployeeContacts,ISaveNewEmployeeJobDescriptions,ISaveNewEmployeeCompensation, IGetBarangayListByCityID, ISaveNewEmployeeAddress
	{
		
		private readonly ParamSaveNewEmployeePersonalInfoModel? _personalInfo;
		private readonly ParamUpdateNewEmployeeSingleInfoModel? _singleInfo;
		private readonly ParamSaveNewEmployeeBenifitsModel? _benifits;
		private readonly ParamSaveNewEmployeeContactsModel? _contacts;
		private readonly ParamSaveNewEmployeeAddressModel? _address;
		private readonly ParamSaveNewEmployeeJobDescriptionsModel? _jobDescriptions;
		private readonly ParamSaveNewEmployeeCompensationsModel? _compensations;
		private readonly int _cityID;

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
		public NewEmployeeAllInformationLogic(ParamSaveNewEmployeeAddressModel? address)
		{
			_address = address;
		}
		public NewEmployeeAllInformationLogic(ParamSaveNewEmployeeJobDescriptionsModel? jobDescriptions)
		{
			_jobDescriptions = jobDescriptions;
		}

		public NewEmployeeAllInformationLogic(ParamSaveNewEmployeeCompensationsModel? compensations)
		{
			_compensations = compensations;
		}

		public NewEmployeeAllInformationLogic(int cityID)
		{
			_cityID = cityID;
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

		async public Task<ReturnSaveNewEmployeeAddressModel> SaveAddress()
		{
			SaveNewEmployeeAddressDataAccess dataAccessData = new(_address);
			return await dataAccessData.SaveAddress();
		}

		async public Task<ReturnSaveNewEmployeeJobDescriptionsModel> SaveJobDescriptions()
        {
			SaveNewEmployeeJobeDescriptionsDataAccess dataAccessData = new(_jobDescriptions);
			return await dataAccessData.SaveJobDescriptions();
		}

		async public Task<ReturnSaveNewEmployeeCompensationsModel> SaveCompensations()
		{
			SaveNewEmployeeCompensationsDataAccess dataAccessData = new(_compensations);
			return await dataAccessData.SaveCompensations();
		}

		async public Task<ReturnBarangayListByCityIDModel> GetBarangayListByCityID()
		{
			GetNewEmployeeBarangayListDataAccess dataAccess = new (_cityID);
			return await dataAccess.GetBarangayListByCityID();
		}
	}
}
