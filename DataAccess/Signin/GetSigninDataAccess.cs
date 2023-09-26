using Microsoft.Data.SqlClient;
using System.Data;
using BusinessModel;
using Microsoft.IdentityModel.Protocols;
using Microsoft.Extensions.Configuration;

namespace DataAccess
{
    public class GetSigninDataAccess : ISigninStatus
    {
        private readonly string _connection = GlobalValues.ConnectionString;
        private readonly ParamSignInDataModels? _signindata;


        public GetSigninDataAccess(ParamSignInDataModels? signindata)
        {
            _signindata = signindata;
        }


        async public Task<ReturnGetSigninDataModel> GetSigninStatus()
        {


            ReturnGetSigninDataModel returnData = new();

            using (SqlConnection conn = new SqlConnection(_connection))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = conn;
                    cmd.CommandText = "[speedx.hrms.access].[spGetLoginCredentials]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter("@userName", SqlDbType.NVarChar));
                    cmd.Parameters["@userName"].Value = _signindata.UserName;

                    cmd.Parameters.Add(new SqlParameter("@employeeNumber", SqlDbType.NVarChar));
                    cmd.Parameters["@employeeNumber"].Value = _signindata.EmployeeNumber;

                    cmd.Parameters.Add(new SqlParameter("@erpModuleID", SqlDbType.Int));
                    cmd.Parameters["@erpModuleID"].Value = _signindata.ErpModuleNumber;

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
                                LoginDataModel loginData = new LoginDataModel()
                                {
                                    HashSaltedIStillLoveYou = reader["IStillLoveYou"].ToString(),
                                    Salt = reader["Salt"].ToString(),
                                };
                                returnData.LoginData = loginData;
                            }

                            reader.NextResult();
                            if (reader.HasRows)
                            {
                                reader.Read();
                                CompanyLoginDataModel compLoginData = new CompanyLoginDataModel()
                                {

                                    CompanyName = reader["CompanyName"].ToString(),
                                    MainHeaderBackGround = reader["MainHeaderBackGround"].ToString(),
                                    LogoImageFileName = reader["LogoImageFileName"].ToString(),
                                };
                                returnData.CompanyLoginData = compLoginData;

                            }

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




