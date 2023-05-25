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
            ReturnGetSigninDataModel data = await dataLogic.GetSigninResults();

            GlobalValues.ConnectionString = data.CompanyLoginData.ConnectionString;

            return Json(await dataLogic.GetSigninResults());
        }
    }
}
