using Microsoft.Data.SqlClient;
using System.Data;
using BusinessModel;

namespace DataAccess
{
    public class SaveNewEmployeeBenifitsDataAccess : ISaveNewEmployeeBenifits
    {
        private string connString = GlobalValues.ConnectionString;
        private readonly ParamSaveNewEmployeeBenifitsModel? _benifits;

        public SaveNewEmployeeBenifitsDataAccess(ParamSaveNewEmployeeBenifitsModel? benifits)
        {
            _benifits = benifits;
        }
       
        async public Task<ReturnSaveNewEmployeeBenifitsModel> SaveBenifits()
        {
            ReturnSaveNewEmployeeBenifitsModel dataModel = new();

            using (SqlConnection conn = new SqlConnection(connString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = conn;
                    cmd.CommandText = "[speedx.hrms.master].[spSaveNewEmployeeBenifits]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter("@userID", SqlDbType.Int));
                    cmd.Parameters["@userID"].Value = _benifits.UserMasterPersonID;

                    cmd.Parameters.Add(new SqlParameter("@masterPersonID", SqlDbType.Int));
                    cmd.Parameters["@masterPersonID"].Value = _benifits.MasterPersonID;

                    cmd.Parameters.Add(new SqlParameter("@sssNumber", SqlDbType.NVarChar));
                    cmd.Parameters["@sssNumber"].Value = _benifits.SssNumber;

                    cmd.Parameters.Add(new SqlParameter("@philhealthNumber", SqlDbType.NVarChar));
                    cmd.Parameters["@philhealthNumber"].Value = _benifits.PhilHealthNumber;

                    cmd.Parameters.Add(new SqlParameter("@pagibigNumber", SqlDbType.NVarChar));
                    cmd.Parameters["@pagibigNumber"].Value = _benifits.PagIbigNumber;

                    cmd.Parameters.Add(new SqlParameter("@tinNumber", SqlDbType.NVarChar));
                    cmd.Parameters["@tinNumber"].Value = _benifits.TinNumber;


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
                                dataModel.SssNumber = reader["SssNumber"].ToString();
                                dataModel.PhilHealthNumber = reader["PhilHealthNumber"].ToString();
                                dataModel.PagIbigNumber = reader["PagIbigNumber"].ToString();
                                dataModel.TinNumber = reader["TinNumber"].ToString();
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




