using Microsoft.Data.SqlClient;
using System.Data;
using BusinessModel;

namespace DataAccess
{
    public class SaveNewEmployeeCompensationsDataAccess : ISaveNewEmployeeCompensation
    {
        private string connString = GlobalValues.ConnectionString;
        private readonly ParamSaveNewEmployeeCompensationsModel? _compensations;

        public SaveNewEmployeeCompensationsDataAccess(ParamSaveNewEmployeeCompensationsModel? compensations)
        {
            _compensations = compensations;
        }
       
        async public Task<ReturnSaveNewEmployeeCompensationsModel> SaveCompensations()
        {
            ReturnSaveNewEmployeeCompensationsModel dataModel = new();

            using (SqlConnection conn = new SqlConnection(connString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = conn;
                    cmd.CommandText = "[speedx.hrms.master].[spSaveNewEmployeeCompensations]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter("@userID", SqlDbType.Int));
                    cmd.Parameters["@userID"].Value = _compensations.UserMasterPersonID;

                    cmd.Parameters.Add(new SqlParameter("@masterPersonID", SqlDbType.Int));
                    cmd.Parameters["@masterPersonID"].Value = _compensations.MasterPersonID;

                    cmd.Parameters.Add(new SqlParameter("@ratePeriodID", SqlDbType.Int));
                    cmd.Parameters["@ratePeriodID"].Value = (_compensations.RatePeriod == null) ? DBNull.Value : _compensations.RatePeriod;

                    cmd.Parameters.Add(new SqlParameter("@basicSalary", SqlDbType.NVarChar));
                    cmd.Parameters["@basicSalary"].Value = (_compensations.BasicSalary == null) ? DBNull.Value : _compensations.BasicSalary;

                    cmd.Parameters.Add(new SqlParameter("@allowance", SqlDbType.NVarChar));
                    cmd.Parameters["@allowance"].Value = (_compensations.Allowance == null) ? DBNull.Value : _compensations.Allowance;

                    cmd.Parameters.Add(new SqlParameter("@salaryConditionID", SqlDbType.Int));
                    cmd.Parameters["@salaryConditionID"].Value = (_compensations.SalaryCondition==null)? DBNull.Value: _compensations.SalaryCondition;

                    


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
                                dataModel.RatePeriodID = Convert.ToInt32(reader["RatePeriodID"]);
                                dataModel.RatePeriodName = reader["RatePeriodName"].ToString();
                                dataModel.SalaryConditionID = Convert.ToInt32(reader["SalaryConditionID"]);
                                dataModel.SalaryConditionName = reader["SalaryConditionName"].ToString();
                                dataModel.BasicSalary = reader["BasicSalary"].ToString();
                                dataModel.Allowance = reader["Allowance"].ToString();
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




