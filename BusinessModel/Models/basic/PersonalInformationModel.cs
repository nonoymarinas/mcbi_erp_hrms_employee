﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
    public class PersonalInformation
    {
        public int MasterPersonID { get; set; }
        public string? EmployeeNumber { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string? DateOfBirth { get; set; }
        public int? GenderID { get; set; }
        public string? Gender { get; set; }

    }
}
