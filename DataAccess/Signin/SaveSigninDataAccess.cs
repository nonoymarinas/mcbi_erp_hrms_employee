using Microsoft.Data.SqlClient;
using System.Data;
using BusinessModel;

namespace DataAccess
{
	public class SaveSigninDataAccess : ISigninStatus
	{
		private readonly ConnectionSettings _connection;
		private readonly ParamSignInUsernameAndPasswordModels? _signindata;

		public SaveSigninDataAccess(ConnectionSettings connection, ParamSignInUsernameAndPasswordModels? signindata)
		{
			_connection = connection;
			_signindata = signindata;
		}

       
		async public Task<ReturnGetSigninStatusModel> GetSigninStatus()
		{
			ReturnGetSigninStatusModel returnData = new();

			using (SqlConnection conn = new SqlConnection(_connection.SQLString))
			{
				conn.Open();
				using (SqlCommand cmd = new SqlCommand())
				{
					cmd.Connection = conn;
					cmd.CommandText = "[speedx.global.user].[spSaveSiginData]";
					cmd.CommandType = CommandType.StoredProcedure;

					cmd.Parameters.Add(new SqlParameter("@UserName", SqlDbType.NVarChar));
					cmd.Parameters["@UserName"].Value = _signindata.UserName;


					cmd.Parameters.Add(new SqlParameter("@HashSaltedIStillLoveYou", SqlDbType.NVarChar));
					cmd.Parameters["@HashSaltedIStillLoveYou"].Value = _signindata.HashSaltedIStillLoveYou;

					cmd.Parameters.Add(new SqlParameter("@Salt", SqlDbType.NVarChar));
					cmd.Parameters["@Salt"].Value = _signindata.Salt;

					
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
								returnData.StatusCodeNumber = Convert.ToInt32(reader["StatusCodenumber"]);
							}
							
						}
					}
				}
			}
			return returnData;
		}
	}
}




