using Microsoft.Data.SqlClient;
using System.Data;
using BusinessModel;

namespace DataAccess
{
    public class GetEmployeeDataByIDDataAccess : IGetMasterPersonByID
    {
        private readonly string connString = GlobalValues.ConnectionString;
        private readonly ParamMasterPersonByIDModel _masterID;

        public GetEmployeeDataByIDDataAccess(ParamMasterPersonByIDModel masterID)
        {
            _masterID = masterID;
        }

        async public Task<ReturnGetEmployeeDataByIDModel> GetMasterPersonByID()
        {
            ReturnGetEmployeeDataByIDModel returnData = new();
            List<Country> countryList = new();
            List<Region> RegionList = new();
            List<Province> ProvinceList = new();
            List<City> CityList = new();
            List<Gender> genderList = new();
            List<Position> positionList = new();
            List<Department> departmentList = new();
            List<RatePeriod> ratePeriodList = new();
            List<SalaryCondition> SalaryConditionList = new();

            using (SqlConnection conn = new SqlConnection(connString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = conn;
                    cmd.CommandText = "[speedx.hrms.master].spGetSearchEmployeeByID";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter("@MasterPersonID", SqlDbType.Int));
                    cmd.Parameters["@MasterPersonID"].Value = _masterID.MasterPersonID;

                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        //Check for errors and if true, retreive the error message!

                        if (reader.GetSchemaTable().Rows[0].ItemArray[0]?.ToString() == "ErrorMessage")
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                returnData.HasError = true;
                                returnData.ErrorMessage = reader["ErrorMessage"].ToString();
                            }
                        }
                        else
                        {

                            if (reader.HasRows)
                            {
                                reader.Read();
                                PersonalInformationModel personalInfo = new PersonalInformationModel()
                                {
                                    MasterPersonID = Convert.ToInt32(reader["MasterPersonID"]),
                                    EmployeeNumber = reader["EmployeeNumber"].ToString(),
                                    FirstName = reader["FirstName"].ToString(),
                                    MiddleName = reader["MiddleName"].ToString(),
                                    LastName = reader["LastName"].ToString(),
                                    DateOfBirth = reader["DateOfBirth"].ToString(),
                                    GenderID = Convert.ToInt32(reader["GenderID"]),
                                };

                                returnData.PersonalInfo = personalInfo;
                            }
                            reader.NextResult();
                            if (reader.HasRows)
                            {
                                reader.Read();
                                WorkersBenifitsModel workersBenifits = new WorkersBenifitsModel()
                                {
                                    UMIDNumber = reader["UMIDNumber"].ToString(),
                                    SSSNumber = reader["SSSNumber"].ToString(),
                                    PagIbigNumber = reader["PagIbigNumber"].ToString(),
                                    PhilHealthNumber = reader["PhilHealthNumber"].ToString(),
                                    TINNumber = reader["TINNumber"].ToString()
                                };

                                returnData.Benifits = workersBenifits;
                            }
                            reader.NextResult();
                            if (reader.HasRows)
                            {
                                reader.Read();
                                WorkersContactsModel workersContacts = new WorkersContactsModel()
                                {
                                    MobileNumber = reader["MobileNumber"].ToString(),
                                    LandLineNumber = reader["LandLineNumber"].ToString(),
                                    EmailAddress = reader["EmailAddress"].ToString()
                                };

                                returnData.Contacts = workersContacts;
                            }

                            reader.NextResult();
                            if (reader.HasRows)
                            {
                                reader.Read();
                                WorkersCompensationModel workersCompensation = new WorkersCompensationModel()
                                {
                                    BasicSalary = Convert.ToDecimal(reader["BasicSalary"]),
                                    Allowance = Convert.ToDecimal(reader["Allowance"]),
                                    CurrencyID = Convert.ToInt32(reader["CurrencyID"]),
                                    RatePeriodID = Convert.ToInt32(reader["RatePeriodID"]),
                                    IsSalaryFixed = Convert.ToInt32(reader["IsSalaryFixed"]),
                                    HourPerDay = Convert.ToInt32(reader["HourPerDay"]),
                                    DayPerMonth = Convert.ToInt32(reader["DayPerMonth"]),
                                };

                                returnData.Compensation = workersCompensation;
                            }

                            reader.NextResult();
                            if (reader.HasRows)
                            {
                                reader.Read();
                                EmployeePhilippineAddress philAddress = new()
                                {
                                    ID = Convert.ToInt32(reader["ID"]),
                                    PostalAddressTypeID = Convert.ToInt32(reader["PostalAddressTypeID"]),
                                    PostalAddressType = reader["PostalAddressType"].ToString(),
                                    CountryID = Convert.ToInt32(reader["CountryID"]),
                                    Country = reader["Country"].ToString(),
                                    RegionID = Convert.ToInt32(reader["RegionID"]),
                                    RegionName = reader["RegionName"].ToString(),
                                    ProvinceID = Convert.ToInt32(reader["ProvinceID"]),
                                    ProvinceName = reader["ProvinceName"].ToString(),
                                    CityOrMunicipalityID = Convert.ToInt32(reader["CityOrMunicipalityID"]),
                                    CityOrMunicipalName = reader["CityOrMunicipalName"].ToString(),
                                    BarangayID = Convert.ToInt32(reader["BarangayID"]),
                                    BarangayName = reader["BarangayName"].ToString(),
                                    StreetEtc = reader["StreetEtc"].ToString(),
                                };

                                returnData.PhilippineAddress = philAddress;
                            }

                            reader.NextResult();
                            if (reader.HasRows)
                            {
                                reader.Read();
                                EmployeeForeignAddress foreignAddress = new()
                                {
                                    ID = Convert.ToInt32(reader["ID"]),
                                    PostalAddressTypeID = Convert.ToInt32(reader["PostalAddressTypeID"]),
                                    PostalAddressType = reader["PostalAddressType"].ToString(),
                                    ForeignCompleteAddress = reader["ForeignCompleteAddress"].ToString(),
                                };
                                returnData.ForeignAddress = foreignAddress;
                            }


                            reader.NextResult();
                            while (reader.Read())
                            {
                                countryList.Add(new Country()
                                {
                                    CountryID = Convert.ToInt32(reader["CountryID"]),
                                    CountryName = reader["CountryName"].ToString(),
                                });
                            }
                            returnData.CountryList= countryList;

                            reader.NextResult();
                            while (reader.Read())
                            {
                                RegionList.Add(new Region()
                                {
                                    CountryID = Convert.ToInt32(reader["CountryID"]),
                                    RegionID = Convert.ToInt32(reader["RegionID"]),
                                    RegionName = reader["RegionName"].ToString(),
                                });
                            }
                            returnData.RegionList = RegionList;

                            reader.NextResult();
                            while (reader.Read())
                            {
                                ProvinceList.Add(new Province()
                                {
                                    ProvinceID = Convert.ToInt32(reader["ProvinceID"]),
                                    RegionID = Convert.ToInt32(reader["RegionID"]),
                                    ProvinceName = reader["ProvinceName"].ToString(),
                                });
                            }
                            returnData.ProvinceList = ProvinceList;

                            reader.NextResult();
                            while (reader.Read())
                            {
                                CityList.Add(new City()
                                {
                                    ProvinceID = Convert.ToInt32(reader["ProvinceID"]),
                                    CityID = Convert.ToInt32(reader["CityID"]),
                                    CityName = reader["CityName"].ToString(),
                                });
                            }
                            returnData.CityList = CityList;


                            reader.NextResult();
                            while (reader.Read())
                            {
                                genderList.Add(new Gender()
                                {
                                    GenderID = Convert.ToInt32(reader["GenderID"]),
                                    GenderName = reader["GenderName"].ToString(),
                                });
                            }
                            returnData.GenderList = genderList;


                            reader.NextResult();
                            while (reader.Read())
                            {
                                positionList.Add(new Position()
                                {
                                    PositionID = Convert.ToInt32(reader["PositionID"]),
                                    PositionName = reader["PositionName"].ToString(),
                                });
                            }
                            returnData.PositionList = positionList;


                            reader.NextResult();
                            while (reader.Read())
                            {
                                departmentList.Add(new Department()
                                {
                                    DepartmentID = Convert.ToInt32(reader["DepartmentID"]),
                                    DepartmentName = reader["DepartmentName"].ToString(),
                                });
                            }
                            returnData.DepartmentList = departmentList;


                            reader.NextResult();
                            while (reader.Read())
                            {
                                ratePeriodList.Add(new RatePeriod()
                                {
                                    RatePeriodID = Convert.ToInt32(reader["RatePeriodID"]),
                                    RatePeriodName = reader["RatePeriodName"].ToString(),
                                });
                            }
                            returnData.RatePeriodList = ratePeriodList;


                            reader.NextResult();
                            while (reader.Read())
                            {
                                SalaryConditionList.Add(new SalaryCondition()
                                {
                                    SalaryConditionID = Convert.ToInt32(reader["SalaryConditionID"]),
                                    SalaryConditionName = reader["SalaryConditionName"].ToString(),
                                });
                            }
                            returnData.SalaryConditionList = SalaryConditionList;

                            reader.NextResult();
                            if (reader.HasRows)
                            {
                                reader.Read();
                                returnData.StatusCodeNumber = Convert.ToInt32(reader["StatusCodeNumber"]);
                            }

                        }
                    }
                }
            }
            return returnData;
        }
    }
}




