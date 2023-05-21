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


        [Route("signin-username-password")]
        async public Task<IActionResult> ValidateLogin(ParamSignInDataModels signinData)
        {
            SiginLogic dataLogic = new SiginLogic(_connection, signinData);

            return Json(await dataLogic.GetSigninResults());
        }
    }
}
