using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
    public class Compensations
    {
        public int RatePeriodID { get; set; }
        public string? RatePeriod { get; set; }
        public string? BasicSalary { get; set; }
        public string? Allowance { get; set; }
        public int CurrencyID { get; set; }
        public string? Currency { get; set; }
        public int SalaryConditionID { get; set; } 
        public string? SalaryCondition { get; set; }
       
    }
}
