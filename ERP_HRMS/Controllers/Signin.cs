using Microsoft.AspNetCore.Mvc;
using BusinessLogic;
using BusinessModel;
using DataAccess;
using Microsoft.Extensions.Options;

namespace ERP_HRMS.Controllers
{
    public class Signin : Controller
    {
        private readonly IOptions<ConnectionSettings> _connection;

        public Signin(IOptions<ConnectionSettings> connection)
        {
            _connection = connection;
        }

        public IActionResult LoginWindow()
        {
            return View();
        }

        [Route("save-username-password")]
        public IActionResult SaveUsernameAndPassword(ParamSignInUsernameAndPasswordModels signinData)
        {
            SiginLogic dataLogic = new SiginLogic(_connection,signinData);
            dataLogic.SaveSigninData();
            return Json(dataLogic.SaveSigninData());
        }

        [Route("signin-username-password")]
        public IActionResult ValidateUsernameAndPassword(ParamSignInUsernameAndPasswordModels signinData)
        {
            SiginLogic dataLogic = new SiginLogic(_connection, signinData);
            dataLogic.GetSigninStatus();
            return Json(signinData);
        }
    }
}
