using Microsoft.AspNetCore.Mvc;

namespace ERP_HRMS.Controllers
{
    public class Address : Controller
    {
        [Route("philippine-address-view")]
        public IActionResult PhilippineAddressView()
        {
            return View();
        }
    }
}
