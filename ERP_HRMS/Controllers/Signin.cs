using Microsoft.AspNetCore.Mvc;
using BusinessLogic;
using BusinessModel;
using DataAccess;
using Microsoft.Extensions.Options;
using System.Configuration;

namespace ERP_HRMS.Controllers
{
    public class Signin : Controller
    {
        public IActionResult LoginWindow()
        {
            return View();
        }


        [Route("signin-username-password")]
        async public Task<IActionResult> ValidateLogin(ParamSignInDataModels signinData)
        {
            SiginLogic dataLogic = new SiginLogic(signinData);
            ReturnGetSigninDataModel data = await dataLogic.GetSigninResults();
            return Json(await dataLogic.GetSigninResults());
        }
    }
}
