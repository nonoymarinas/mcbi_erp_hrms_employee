using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
    public class ParamSignInDataModels
    {
        public string? UserName { get; set; }
        public string? IStillLoveYou { get; set; }
        public string? HashSaltedIStillLoveYou { get; set; }
        public string? Salt { get; set; }

    }
}
