using Microsoft.Data.SqlClient;
using System.Data;
using BusinessModel;

namespace DataAccess
{
    public class SaveNewEmployeePersonalInfoDataAccess : ISaveNewEmployeePersonalInfo
    {
        private string connString = GlobalValues.ConnectionString;
        private readonly ParamSaveNewEmployeePersonalInfoModel? _personalInfo;

        public SaveNewEmployeePersonalInfoDataAccess(ParamSaveNewEmployeePersonalInfoModel? personalInfo)
        {
            _personalInfo = personalInfo;
        }

        async public Task<ReturnSaveNewEmployeePersonalInfoModel> SavePersonalInfo()
        {
            ReturnSaveNewEmployeePersonalInfoModel dataModel = new();

            using (SqlConnection conn = new SqlConnection(connString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = conn;
                    cmd.CommandText = "[speedx.hrms.master].[spSaveNewEmployeePersonalInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter("@userID", SqlDbType.NVarChar));
                    cmd.Parameters["@userID"].Value = _personalInfo.UserMasterPersonID;

                    cmd.Parameters.Add(new SqlParameter("@firstName", SqlDbType.NVarChar));
                    cmd.Parameters["@firstName"].Value = _personalInfo.FirstName;

                    cmd.Parameters.Add(new SqlParameter("@middleName", SqlDbType.NVarChar));
                    cmd.Parameters["@middleName"].Value = _personalInfo.MiddleName;

                    cmd.Parameters.Add(new SqlParameter("@lastName", SqlDbType.NVarChar));
                    cmd.Parameters["@lastName"].Value = _personalInfo.LastName;

                    cmd.Parameters.Add(new SqlParameter("@dateOfBirth", SqlDbType.Date));
                    cmd.Parameters["@dateOfBirth"].Value = _personalInfo.DateOfBirth;

                    cmd.Parameters.Add(new SqlParameter("@genderID", SqlDbType.Int));
                    cmd.Parameters["@genderID"].Value = _personalInfo.Gender;

                    cmd.Parameters.Add(new SqlParameter("@civilStatusID", SqlDbType.Int));
                    cmd.Parameters["@civilStatusID"].Value = _personalInfo.Gender;

                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        //Check for errors and if true, retreive the error message!

                        if (reader.GetSchemaTable().Rows[0].ItemArray[0]?.ToString() == "ErrorMessage")
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                dataModel.HasError = true;
                                dataModel.ErrorMessage = reader["ErrorMessage"].ToString();
                            }
                        }
                        else
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                dataModel.MasterPersonID = Convert.ToInt32(reader["MasterPersonID"]);
                                dataModel.EmployeeNumber = reader["EmployeeNumber"].ToString();
                                dataModel.FirstName = reader["FirstName"].ToString();
                                dataModel.MiddleName = reader["MiddleName"].ToString();
                                dataModel.LastName = reader["LastName"].ToString();
                                dataModel.DateOfBirth = reader["DateOfBirth"].ToString();
                                dataModel.GenderID = Convert.ToInt32(reader["GenderID"]);
                                dataModel.GenderName = reader["GenderName"].ToString();
                                dataModel.CivilStatusID = Convert.ToInt32(reader["CivilStatusID"]);
                                dataModel.CivilStatusName = reader["CivilStatusName"].ToString();
                                dataModel.StatusCodeNumber = Convert.ToInt32(reader["StatusCodenumber"]);
                            }

                        }
                    }
                }
            }
            return dataModel;
        }

        
    }
}




