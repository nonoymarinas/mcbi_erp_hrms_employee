using Microsoft.Data.SqlClient;
using System.Data;
using BusinessModel;

namespace DataAccess
{
    public class SaveNewEmployeeContactsDataAccess : ISaveNewEmployeeContacts
    {
        private string connString = GlobalValues.ConnectionString;
        private readonly ParamSaveNewEmployeeContactsModel? _contacts;

        public SaveNewEmployeeContactsDataAccess(ParamSaveNewEmployeeContactsModel? contacts)
        {
            _contacts = contacts;
        }
       
        async public Task<ReturnSaveNewEmployeeContactsModel> SaveContacts()
        {
            ReturnSaveNewEmployeeContactsModel dataModel = new();

            using (SqlConnection conn = new SqlConnection(connString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = conn;
                    cmd.CommandText = "[speedx.hrms.master].[spSaveNewEmployeeContacts]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter("@userID", SqlDbType.Int));
                    cmd.Parameters["@userID"].Value = _contacts.UserMasterPersonID;

                    cmd.Parameters.Add(new SqlParameter("@masterPersonID", SqlDbType.Int));
                    cmd.Parameters["@masterPersonID"].Value = _contacts.MasterPersonID;

                    cmd.Parameters.Add(new SqlParameter("@mobileNumber", SqlDbType.NVarChar));
                    cmd.Parameters["@mobileNumber"].Value = (_contacts.MobileNumber == null) ? DBNull.Value : _contacts.MobileNumber;

                    cmd.Parameters.Add(new SqlParameter("@landlineNumber", SqlDbType.NVarChar));
                    cmd.Parameters["@landlineNumber"].Value = (_contacts.LandLineNumber == null) ? DBNull.Value : _contacts.LandLineNumber;

                    cmd.Parameters.Add(new SqlParameter("@emailAddress", SqlDbType.NVarChar));
                    cmd.Parameters["@emailAddress"].Value = (_contacts.EmailAddress==null)? DBNull.Value: _contacts.EmailAddress;

                    
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
                                dataModel.MobileNumber = reader["MobileNumber"].ToString();
                                dataModel.LandLineNumber = reader["LandLineNumber"].ToString();
                                dataModel.EmailAddress = reader["EmailAddress"].ToString();
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




