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
		public string? HashIStillLoveYouWithSalt { get; set; }
		public bool IsUsernameExist { get; set; } = true;
		public string? Salt { get; set; }

	}
}
