using Microsoft.Data.SqlClient;
using System.Data;
using BusinessModel;

namespace DataAccess
{
    public class UpdateNewEmployeeSingleInfoDataAccess : IUpdateNewEmployeeSingleInfo
    {
        private string connString = GlobalValues.ConnectionString;
        private readonly ParamUpdateNewEmployeeSingleInfoModel? _singleInfo;

        public UpdateNewEmployeeSingleInfoDataAccess(ParamUpdateNewEmployeeSingleInfoModel? singleInfo)
        {
            _singleInfo = singleInfo;
        }
       
        async public Task<ReturnUpdateNewEmployeeSingleInfoModel> UpdateSingleInfo()
        {
            ReturnUpdateNewEmployeeSingleInfoModel dataModel = new();

            using (SqlConnection conn = new SqlConnection(connString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = conn;
                    cmd.CommandText = "[speedx.hrms.master].[spUpdateNewEmployeeSingleInfo]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter("@userID", SqlDbType.Int));
                    cmd.Parameters["@userID"].Value = _singleInfo.UserMasterPersonID;

                    cmd.Parameters.Add(new SqlParameter("@masterPersonID", SqlDbType.Int));
                    cmd.Parameters["@masterPersonID"].Value = _singleInfo.MasterPersonID;

                    cmd.Parameters.Add(new SqlParameter("@name", SqlDbType.NVarChar));
                    cmd.Parameters["@name"].Value = _singleInfo.Name;

                    cmd.Parameters.Add(new SqlParameter("@value", SqlDbType.NVarChar));
                    cmd.Parameters["@value"].Value = _singleInfo.Value;

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
                                dataModel.Name = reader["Name"].ToString();
                                dataModel.Value = reader["Value"].ToString();
                                dataModel.StatusCodeNumber = Convert.ToInt32(reader["StatusCodeNumber"]);
                            }

                        }
                    }
                }
            }
            return dataModel;
        }

      
    }
}




