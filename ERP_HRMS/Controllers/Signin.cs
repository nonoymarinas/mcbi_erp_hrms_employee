using Microsoft.AspNetCore.Mvc;
using BusinessLogic;
using BusinessModel;
using DataAccess;
using Microsoft.Extensions.Options;

namespace ERP_HRMS.Controllers
{
    public class Signin : Controller
    {
        public IActionResult LoginWindow()
        {
            return View();
        }

        [Route("signin-username-password")]
        public IActionResult ValidateUsernameAndPassword(ParamSignInUsernameAndPasswordModels signinData)
        {
            return Json(signinData);
        }
    }
}
