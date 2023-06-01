using Microsoft.AspNetCore.Mvc;
using BusinessLogic;
using BusinessModel;
using DataAccess;
using Microsoft.Extensions.Options;

namespace ERP_HRMS.Controllers
{
    public class AllEmployee : Controller
    {
       

        //public AllEmployee(IOptions<ConnectionSettings> connection)
        //{
        //    _connection = connection;
        //}
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
        async public Task<IActionResult> GetViewImageSource()
        {
            return View();
        }
    }
}
