using BusinessModel.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
	public class ReturnGetSigninDataModel : DBStandardReturn
	{
	
		public LoginDataModel? LoginData { get; set; }

        public CompanyLoginDataDataModel? CompanyLoginData { get; set; }

    }
}
