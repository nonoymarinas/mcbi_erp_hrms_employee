using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using DataAccess;
using BusinessModel;

namespace BusinessLogic
{
    public class AllEmployeeLogic : IGetMasterPersonData, IGetMasterPersonByID,IGetBarangayListByCityID
    {
   
        private readonly ParamMasterPersonByIDModel? _masterID;
        private readonly int _cityID;

        public AllEmployeeLogic()
        {
           
        }

        public AllEmployeeLogic(ParamMasterPersonByIDModel masterID)
        {
            _masterID = masterID;
        }

        public AllEmployeeLogic(int cityID)
        {
            _cityID = cityID;
        }
        async public Task<ReturnGetMasterPersonDataModel> GetMasterPersonData()
        {
            GetMasterPersonDataAccess accessData = new GetMasterPersonDataAccess();
            ReturnGetMasterPersonDataModel data = await accessData.GetMasterPersonData();

            for (var i = 0; i < data.MasterPersonList.Count; i++){
                StringBuilder fullName = new StringBuilder();
                fullName.Append(data.MasterPersonList[i].EmployeeNumber.ToUpper());
                fullName.Append(" ");
                fullName.Append(data.MasterPersonList[i].FirstName.ToUpper());
                fullName.Append(" ");
                fullName.Append(data.MasterPersonList[i].LastName.ToUpper());
                data.MasterPersonList[i].FullName = fullName.ToString();
            }

            return data;

        }

        async public Task<ReturnGetEmployeeDataByIDModel> GetMasterPersonByID()
        {
            GetEmployeeDataByIDDataAccess accessData = new GetEmployeeDataByIDDataAccess(_masterID);
            return await accessData.GetMasterPersonByID();
        }

        async public Task<ReturnBarangayListByCityIDModel> GetBarangayListByCityID()
        {
            GetBarangayListDataAccess dataAccess = new GetBarangayListDataAccess(_cityID);
            return await dataAccess.GetBarangayListByCityID();
        }
    }
}
