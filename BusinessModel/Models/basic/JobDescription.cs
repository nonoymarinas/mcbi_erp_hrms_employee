using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
    public class JobDescription
    {
        public int PositionID { get; set; }
        public string? PositionName { get; set; }
        public int DepartmentID { get; set; }
        public string? DepartmentName { get; set; }
        public string? DateHired { get; set; }
        public int ProjectAssignmentID { get; set; }
        public string? ProjectAssignment { get; set; }
        public string? ProjectNumber { get; set; }
        public string? Remarks { get; set; }
    }
}
