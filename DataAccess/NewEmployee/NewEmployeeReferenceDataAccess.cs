using Microsoft.Data.SqlClient;
using System.Data;
using BusinessModel;

namespace DataAccess
{
    public class NewEmployeeReferenceDataAccess : IGetNewEmployeeRefData
    {
        private readonly string connString = GlobalValues.ConnectionString;

        async public Task<ReturnNewEmpReferenceDataModel> GetReferenceData()
        {
            ReturnNewEmpReferenceDataModel returnData = new();
            List<CivilStatus> CivilStatusList = new();
            List<Gender> GenderList = new();
            List<Country> CountryList = new();
            List<Region> RegionList = new();
            List<Province> ProvinceList = new();
            List<City> CityList = new();
            List<Position> PositionList = new();
            List<Department> DepartmentList = new();
            List<RatePeriod> RatePeriodList = new();
            List<SalaryCondition> SalaryConditionList = new();

            using (SqlConnection conn = new SqlConnection(connString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = conn;
                    cmd.CommandText = "[speedx.hrms.master].[spGetNewEmployeeReferenceData]";
                    cmd.CommandType = CommandType.StoredProcedure;

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
                            //civil status
                            while (reader.Read())
                            {
                                CivilStatusList.Add(new CivilStatus()
                                {
                                    CivilStatusID = Convert.ToInt32(reader["CivilStatusID"]),
                                    CivilStatusName = reader["CivilStatusName"].ToString(),
                                });
                            }
                            returnData.CivilStatusList = CivilStatusList;

                            //gender
                            reader.NextResult();
                            while (reader.Read())
                            {
                                GenderList.Add(new Gender()
                                {
                                    GenderID = Convert.ToInt32(reader["GenderID"]),
                                    GenderName = reader["GenderName"].ToString(),
                                });
                            }
                            returnData.GenderList = GenderList;

                            //country
                            reader.NextResult();
                            while (reader.Read())
                            {
                                CountryList.Add(new Country()
                                {
                                    CountryID = Convert.ToInt32(reader["CountryID"]),
                                    CountryName = reader["CountryName"].ToString(),
                                });
                            }
                            returnData.CountryList = CountryList;

                            //region
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

                            //province
                            reader.NextResult();
                            while (reader.Read())
                            {
                                ProvinceList.Add(new Province()
                                {
                                    RegionID = Convert.ToInt32(reader["RegionID"]),
                                    ProvinceID = Convert.ToInt32(reader["ProvinceID"]),
                                    ProvinceName = reader["ProvinceName"].ToString(),
                                });
                            }
                            returnData.ProvinceList = ProvinceList;

                            //city
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

                            //position
                            reader.NextResult();
                            while (reader.Read())
                            {
                                PositionList.Add(new Position()
                                {
                                    PositionID = Convert.ToInt32(reader["PositionID"]),
                                    PositionName = reader["PositionName"].ToString(),
                                });
                            }
                            returnData.PositionList = PositionList;

                            //department
                            reader.NextResult();
                            while (reader.Read())
                            {
                                DepartmentList.Add(new Department()
                                {
                                    DepartmentID = Convert.ToInt32(reader["DepartmentID"]),
                                    DepartmentName = reader["DepartmentName"].ToString(),
                                });
                            }
                            returnData.DepartmentList = DepartmentList;

                            //rate period
                            reader.NextResult();
                            while (reader.Read())
                            {
                                RatePeriodList.Add(new RatePeriod()
                                {
                                    RatePeriodID = Convert.ToInt32(reader["RatePeriodID"]),
                                    RatePeriodName = reader["RatePeriodName"].ToString(),
                                });
                            }
                            returnData.RatePeriodList = RatePeriodList;

                            //salary condition
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

                            //status code
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




