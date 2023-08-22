﻿using Microsoft.Data.SqlClient;
using System.Data;
using BusinessModel;

namespace DataAccess
{
	public class SavePersonalInformationDataAccess: ISavePersonalInfo
	{
		private string connString = GlobalValues.ConnectionString;
		private readonly ParamPersonalInfoModel? _personalInfo;

		public SavePersonalInformationDataAccess(ParamPersonalInfoModel? personalInfo)
		{
			_personalInfo= personalInfo;
		}


		async public Task<ReturnSavePersonalInfoModels> SavePersonalInfo()
		{
			ReturnSavePersonalInfoModels dataModel = new();

			using (SqlConnection conn = new SqlConnection(connString))
			{
				conn.Open();
				using (SqlCommand cmd = new SqlCommand())
				{
					cmd.Connection = conn;
					cmd.CommandText = "[speedx.hrms.master].[spSavePersonalInformation]";
					cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter("@MasterPersonUserID", SqlDbType.Int));
                    cmd.Parameters["@MasterPersonUserID"].Value = _personalInfo.MasterPersonUserID;

                    cmd.Parameters.Add(new SqlParameter("@FirstName", SqlDbType.NVarChar));
					cmd.Parameters["@FirstName"].Value = _personalInfo.FirstName;

					cmd.Parameters.Add(new SqlParameter("@MiddleName", SqlDbType.NVarChar));
					cmd.Parameters["@MiddleName"].Value = _personalInfo.MiddleName;

					cmd.Parameters.Add(new SqlParameter("@LastName", SqlDbType.NVarChar));
					cmd.Parameters["@LastName"].Value = _personalInfo.LastName;

					cmd.Parameters.Add(new SqlParameter("@DateOfBirth", SqlDbType.Date));
					cmd.Parameters["@DateOfBirth"].Value = _personalInfo.DateOfBirth;

                    cmd.Parameters.Add(new SqlParameter("@Gender", SqlDbType.Int));
                    cmd.Parameters["@Gender"].Value = _personalInfo.Gender;

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
								dataModel.EmployeeNumber = reader["EmployeeNumber"].ToString();
								dataModel.FirstName = reader["FirstName"].ToString();
								dataModel.MiddleName = reader["MiddleName"].ToString();
								dataModel.LastName = reader["LastName"].ToString();
								dataModel.DateOfBirth = reader["DateOfBirth"].ToString();
                                dataModel.Gender = Convert.ToInt32(reader["Gender"]);
                                dataModel.StatusCodeNumber = Convert.ToInt32(reader["StatusCodenumber"]);
							}
							
						}
					}
				}
			}
			return dataModel;
		}
	}
}




