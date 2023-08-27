using Microsoft.AspNetCore.Mvc;
using BusinessLogic;
using BusinessModel;
using DataAccess;
using Microsoft.Extensions.Options;

namespace ERP_HRMS.Controllers
{
    public class AllEmployee : Controller
    {
       
        public IActionResult MainPage()
        {
            return View();
        }

        [Route("all-employee-data")]
        async public Task<IActionResult> GetMasterPersonData()
        {
            AllEmployeeLogic dataLogic = new();
            return Json(await dataLogic.GetMasterPersonData());
        }

        [Route("single-employee-data")]
        async public Task<IActionResult> GetMasterPersonDataByID(ParamMasterPersonByIDModel masterID)
        {
            AllEmployeeLogic dataLogic = new( masterID);
            return Json(await dataLogic.GetMasterPersonByID());
        }

        [Route("select-image-source")]
        public IActionResult GetViewImageSource()
        {
            return View();
        }

        [Route("single-employee-display-view")]
        public IActionResult GetViewSingleEmployeeDisplay()
        {
            return View("SingleEmployeeDisplay");
        }

        [Route("update-employee-info")]
        public IActionResult UpdateEmployeeInfo(ParamEmployeeInfoAttr empInfo)
        {
            return Json(empInfo);
        }

        [Route("address-list-barangay-by-city")]
        async public Task<IActionResult> GetBarangayListByCityID(int cityId)
        {
            AllEmployeeLogic logicData = new(cityId);
            return Json(await logicData.GetBarangayListByCityID());
        }
    }
}
