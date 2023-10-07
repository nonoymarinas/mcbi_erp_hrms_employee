using Microsoft.Data.SqlClient;
using System.Data;
using BusinessModel;

namespace DataAccess
{
    public class SaveNewEmployeeEmploymentsDataAccess : ISaveNewEmployeeJobDescriptions
    {
        private string connString = GlobalValues.ConnectionString;
        private readonly ParamSaveNewEmployeeJobEmploymentModel? _jobDescriptions;

        public SaveNewEmployeeEmploymentsDataAccess(ParamSaveNewEmployeeJobEmploymentModel? jobDescriptions)
        {
            _jobDescriptions = jobDescriptions;
        }

        async public Task<ReturnSaveNewEmployeeEmploymentsModel> SaveJobDescriptions()
        {
            ReturnSaveNewEmployeeEmploymentsModel dataModel = new();

            using (SqlConnection conn = new SqlConnection(connString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = conn;
                    cmd.CommandText = "[speedx.hrms.master].[spSaveNewEmployeeJobDescription]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter("@userID", SqlDbType.Int));
                    cmd.Parameters["@userID"].Value = _jobDescriptions.UserMasterPersonID;

                    cmd.Parameters.Add(new SqlParameter("@masterPersonID", SqlDbType.Int));
                    cmd.Parameters["@masterPersonID"].Value = _jobDescriptions.MasterPersonID;

                    cmd.Parameters.Add(new SqlParameter("@positionID", SqlDbType.NVarChar));
                    cmd.Parameters["@positionID"].Value = (_jobDescriptions.Position == null) ? DBNull.Value : _jobDescriptions.Position;

                    cmd.Parameters.Add(new SqlParameter("@departmentID", SqlDbType.NVarChar));
                    cmd.Parameters["@departmentID"].Value = (_jobDescriptions.Department == null) ? DBNull.Value : _jobDescriptions.Department;

                    cmd.Parameters.Add(new SqlParameter("@dateHired", SqlDbType.Date));
                    cmd.Parameters["@dateHired"].Value = (_jobDescriptions.DateHired == null) ? DBNull.Value : _jobDescriptions.DateHired;

                    cmd.Parameters.Add(new SqlParameter("@projectAssignmentID", SqlDbType.Date));
                    cmd.Parameters["@projectAssignmentID"].Value = (_jobDescriptions.ProjectAssignmentID == null) ? DBNull.Value : _jobDescriptions.DateHired;

                    cmd.Parameters.Add(new SqlParameter("@remarks", SqlDbType.NVarChar));
                    cmd.Parameters["@remarks"].Value = (_jobDescriptions.Remarks == null) ? DBNull.Value : _jobDescriptions.Remarks;


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
                                dataModel.PositionName = reader["PositionName"].ToString();
                                dataModel.PositionID = Convert.ToInt32(reader["PositionID"]);
                                dataModel.DepartmentName = reader["DepartmentName"].ToString();
                                dataModel.DepartmentID = Convert.ToInt32(reader["DepartmentID"]);
                                dataModel.DateHired = reader["ProjectAssignment"].ToString();
                                dataModel.ProjectAssignment = reader["ProjectAssignment"].ToString();
                                dataModel.ProjectAssignmentID = Convert.ToInt32(reader["ProjectAssignmentID"]);
                                dataModel.Remarks = reader["Remarks"].ToString();
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




