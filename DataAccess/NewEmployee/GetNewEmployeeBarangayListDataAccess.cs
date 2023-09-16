using Microsoft.Data.SqlClient;
using System.Data;
using BusinessModel;

namespace DataAccess
{
    public class GetNewEmployeeBarangayListDataAccess : IGetBarangayListByCityID
    {
        private readonly string connString = GlobalValues.ConnectionString;
        private readonly int _cityID;

        public GetNewEmployeeBarangayListDataAccess(int cityID)
        {
            _cityID = cityID;
        }

        async public Task<ReturnBarangayListByCityIDModel> GetBarangayListByCityID()
        {
            ReturnBarangayListByCityIDModel returnData = new();
            List<Barangay> BarangayList = new();

            using (SqlConnection conn = new SqlConnection(connString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = conn;
                    cmd.CommandText = "[speedx.hrms.address].[spGetBarangayListByCityID]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter("@CityID", SqlDbType.Int));
                    cmd.Parameters["@CityID"].Value = _cityID;

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

                            while (reader.Read())
                            {
                                BarangayList.Add(new Barangay()
                                {
                                    BarangayID = Convert.ToInt32(reader["BarangayID"]),
                                    CityID = Convert.ToInt32(reader["CityID"]),
                                    BarangayName = reader["BarangayName"].ToString(),
                                });
                            }
                            returnData.BarangayList = BarangayList;

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




