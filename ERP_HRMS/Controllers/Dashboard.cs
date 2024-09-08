using Microsoft.AspNetCore.Mvc;

namespace ERP_HRMS.Controllers
{
    public class DashBoard : Controller
    {
        [Route("dashboard-main-page")]
        public IActionResult MainPage()
        {
            return View();
        }
    }
}
