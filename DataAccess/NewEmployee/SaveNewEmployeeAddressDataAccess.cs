using Microsoft.Data.SqlClient;
using System.Data;
using BusinessModel;

namespace DataAccess
{
    public class SaveNewEmployeeAddressDataAccess : ISaveNewEmployeeAddress
    {
        private string connString = GlobalValues.ConnectionString;
        private readonly ParamSaveNewEmployeeAddressModel? _address;

        public SaveNewEmployeeAddressDataAccess(ParamSaveNewEmployeeAddressModel? address)
        {
            _address = address;
        }

        async public Task<ReturnSaveNewEmployeeAddressModel> SaveAddress()
        {
            ReturnSaveNewEmployeeAddressModel dataModel = new();

            using (SqlConnection conn = new SqlConnection(connString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = conn;
                    cmd.CommandText = "[speedx.hrms.address].[spSaveNewEmployeeAddress]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter("@userID", SqlDbType.Int));
                    cmd.Parameters["@userID"].Value = _address.UserMasterPersonID;

                    cmd.Parameters.Add(new SqlParameter("@masterPersonID", SqlDbType.Int));
                    cmd.Parameters["@masterPersonID"].Value = _address.MasterPersonID;

                    cmd.Parameters.Add(new SqlParameter("@addressTypeID", SqlDbType.Int));
                    cmd.Parameters["@addressTypeID"].Value = (_address.AddressTypeID == null) ? DBNull.Value : _address.AddressTypeID;

                    cmd.Parameters.Add(new SqlParameter("@countryID", SqlDbType.Int));
                    cmd.Parameters["@countryID"].Value = (_address.CountryID == null) ? DBNull.Value : _address.CountryID;

                    cmd.Parameters.Add(new SqlParameter("@cityID", SqlDbType.Int));
                    cmd.Parameters["@cityID"].Value = (_address.CityID == null) ? DBNull.Value : _address.CityID;

                    cmd.Parameters.Add(new SqlParameter("@barangayID", SqlDbType.Int));
                    cmd.Parameters["@barangayID"].Value = (_address.BarangayID == null) ? DBNull.Value : _address.BarangayID;

                    cmd.Parameters.Add(new SqlParameter("@addLine1", SqlDbType.NVarChar));
                    cmd.Parameters["@addLine1"].Value = (_address.AddressLine1 == null) ? DBNull.Value : _address.AddressLine1;

                    cmd.Parameters.Add(new SqlParameter("@addLine2", SqlDbType.NVarChar));
                    cmd.Parameters["@addLine2"].Value = (_address.AddressLine2 == null) ? DBNull.Value : _address.AddressLine2;


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
                                dataModel.CountryID = Convert.ToInt32(reader["CountryID"]);
                                dataModel.CountryName = reader["CountryName"].ToString();
                                dataModel.RegionID = Convert.ToInt32(reader["RegionID"]);
                                dataModel.RegionName = reader["RegionName"].ToString();
                                dataModel.ProvinceID = Convert.ToInt32(reader["ProvinceID"]);
                                dataModel.ProvinceName = reader["ProvinceName"].ToString();
                                dataModel.CityID = Convert.ToInt32(reader["CityID"]);
                                dataModel.CityName = reader["CityName"].ToString();
                                dataModel.BarangayID = Convert.ToInt32(reader["BarangayID"]);
                                dataModel.BarangayName = reader["BarangayName"].ToString();
                                dataModel.AddressLine1 = reader["AddressLine1"].ToString();
                                dataModel.AddressLine2 = reader["AddressLine2"].ToString();
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




