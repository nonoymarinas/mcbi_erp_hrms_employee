using Microsoft.AspNetCore.Mvc;
using BusinessLogic;
using BusinessModel;
using DataAccess;
using Microsoft.Extensions.Options;

namespace ERP_HRMS.Controllers
{
    public class NewEmployee : Controller
    {
        private readonly AzureStorageAccountsOptions _azureOptions;
        public NewEmployee(IOptions<AzureStorageAccountsOptions> azureOptions)
        {
            _azureOptions = azureOptions.Value;
        }
        [Route("new-employee-main-page")]
        public IActionResult NewEmployeeMainPage()
        {
            return View();
        }

        [Route("new-employee-ref-data")]
        async public Task<IActionResult> NewEmployeeReferenceData()
        {
            NewEmpReferenceDataLogic dataLogic = new();
            return Json(await dataLogic.GetReferenceData());
        }

        [Route("employee-detail-page")]
        public IActionResult NewEmployeeOldMainPage()
        {
            return View();
        }


        [Route("save-new-employee-personalinfo")]
        async public Task<IActionResult> SaveNewEmployeePersonalInfo(ParamSaveNewEmployeePersonalInfoModel personalInfo)
        {
            NewEmployeeAllInformationLogic dataLogic = new(personalInfo);
            return Json(await dataLogic.SavePersonalInfo());
        }

        [Route("save-new-employee-benifits")]
        async public Task<IActionResult> SaveNewEmployeeBenifits(ParamSaveNewEmployeeBenifitsModel benifits)
        {
            NewEmployeeAllInformationLogic dataLogic = new(benifits);
            return Json(await dataLogic.SaveBenifits());
        }

        [Route("save-new-employee-contacts")]
        async public Task<IActionResult> SaveNewEmployeeContacts(ParamSaveNewEmployeeContactsModel contacts)
        {
            NewEmployeeAllInformationLogic dataLogic = new(contacts);
            return Json(await dataLogic.SaveContacts());
        }

        [Route("save-new-employee-address")]
        async public Task<IActionResult> SaveNewEmployeeAddress(ParamSaveNewEmployeeAddressModel address)
        {
            NewEmployeeAllInformationLogic dataLogic = new(address);
            return Json(await dataLogic.SaveAddress());
        }

        [Route("save-new-employee-jobdescriptions")]
        async public Task<IActionResult> SaveNewEmployeeJobDescriptions(ParamSaveNewEmployeeJobEmploymentModel jobDesc)
        {
            NewEmployeeAllInformationLogic dataLogic = new(jobDesc);
            return Json(await dataLogic.SaveJobDescriptions());
        }

        [Route("save-new-employee-compensation")]
        async public Task<IActionResult> SaveNewEmployeeCompensations(ParamSaveNewEmployeeCompensationsModel compensation)
        {
            NewEmployeeAllInformationLogic dataLogic = new(compensation);
            return Json(await dataLogic.SaveCompensations());
        }

        [Route("update-new-employee-ind-info")]
        async public Task<IActionResult> UpdateNewEmployeeSingleInfo(ParamUpdateNewEmployeeSingleInfoModel singleInfo)
        {
            NewEmployeeAllInformationLogic dataLogic = new(singleInfo);
            return Json(await dataLogic.UpdateSingleInfo());
        }

        [Route("get-new-employee-barangay-list")]
        async public Task<IActionResult> GetNewEmployeeBarangayList(int cityID)
        {
            NewEmployeeAllInformationLogic dataLogic = new(cityID);
            return Json(await dataLogic.GetBarangayListByCityID());
        }

        [Route("upload-new-emp-photo-image")]
        public async Task<IActionResult> UpdateNewEmployeePhotoImage(ParamUploadPhotoImageModel image)
        {
            NewEmployeePhotoImageLogic dataLogic = new(image, _azureOptions);
            return Json(await dataLogic.UploadPhotoImages());
        }
    }

}
