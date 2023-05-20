using Microsoft.Data.SqlClient;
using System.Data;
using BusinessModel;

namespace DataAccess
{
	public class GetSigninDataAccess : ISigninStatus
	{
		private readonly ConnectionSettings _connection;
		private readonly ParamSignInUsernameAndPasswordModels? _signindata;

		public GetSigninDataAccess(ConnectionSettings connection, ParamSignInUsernameAndPasswordModels? signindata)
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
					cmd.CommandText = "[speedx.global.user].[spGetSiginData]";
					cmd.CommandType = CommandType.StoredProcedure;

					cmd.Parameters.Add(new SqlParameter("@UserName", SqlDbType.NVarChar));
					cmd.Parameters["@UserName"].Value = _signindata.UserName;

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
								returnData.HashIStillLoveYouWithSalt = reader["HashIStillLoveYouWithSalt"].ToString();
								returnData.Salt = reader["Salt"].ToString();
								returnData.StatusCodeNumber = Convert.ToInt32(reader["StatusCodenumber"]);
								returnData.IsUsernameExist = Convert.ToBoolean(reader["IsUsernameExist"]);

							}
							
						}
					}
				}
			}
			return returnData;
		}
	}
}




