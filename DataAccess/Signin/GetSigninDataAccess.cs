using Microsoft.Data.SqlClient;
using System.Data;
using BusinessModel;
using Microsoft.IdentityModel.Protocols;
using Microsoft.Extensions.Configuration;

namespace DataAccess
{
    public class GetSigninDataAccess : ISigninStatus
    {
        private readonly ConnectionSettings _connection;
        private readonly ParamSignInDataModels? _signindata;
        
        
        public GetSigninDataAccess(ConnectionSettings connection, ParamSignInDataModels? signindata)
        {
            _connection = connection;
            _signindata = signindata;
        }


        async public Task<ReturnGetSigninDataModel> GetSigninStatus()
        {
            

            ReturnGetSigninDataModel returnData = new();

            using (SqlConnection conn = new SqlConnection(_connection.SQLString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = conn;
                    cmd.CommandText = "[erp.global.user].[spValidateLoginAndGetData]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter("@UserName", SqlDbType.NVarChar));
                    cmd.Parameters["@UserName"].Value = _signindata.UserName;

                    cmd.Parameters.Add(new SqlParameter("@ErpModuleNumber", SqlDbType.Int));
                    cmd.Parameters["@ErpModuleNumber"].Value = _signindata.ErpModuleNumber;

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
                                LoginDataModel loginData = new LoginDataModel();
                                loginData.HashSaltedIStillLoveYou = reader["HashIStillLoveYouWithSalt"].ToString();
                                loginData.Salt = reader["Salt"].ToString();

                                var IsUsernameExist = Convert.ToInt32(reader["IsUsernameExist"]);

                                if (IsUsernameExist == 1)
                                {
                                    loginData.IsUsernameExist = true;

                                }
                                else
                                {
                                    loginData.IsUsernameExist = false;
                                }

                                returnData.LoginData = loginData;
                            }

                            reader.NextResult();
                            if (reader.HasRows)
                            {
                                reader.Read();
                                CompanyLoginDataDataModel compLoginData = new CompanyLoginDataDataModel();
                                compLoginData.CompanyID = Convert.ToInt32(reader["CompanyID"]);
                                compLoginData.CompanyDisplayName = reader["CompanyDisplayName"].ToString();
                                compLoginData.ActiveText = reader["ActiveText"].ToString();
                                compLoginData.DisabledText = reader["DisabledText"].ToString();
                                compLoginData.InputBorder = reader["InputBorder"].ToString();
                                compLoginData.MainHeaderBackGround = reader["MainHeaderBackGround"].ToString();
                                compLoginData.MainHeaderText = reader["MainHeaderText"].ToString();
                                compLoginData.MainTitleText = reader["MainTitleText"].ToString();
                                compLoginData.PageBackGround = reader["PageBackGround"].ToString();
                                compLoginData.SubTitleText = reader["SubTitleText"].ToString();
                                compLoginData.CompanyLogoURL = reader["CompanyLogoURL"].ToString();
                                compLoginData.ConnectionString = reader["ConnectionString"].ToString();

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




