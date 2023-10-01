using Microsoft.Data.SqlClient;
using System.Data;
using BusinessModel;
using System.IO;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using System.Net.Http.Headers;

namespace DataAccess
{
    public class UploadNewEmployeePhotoImageDataAccess : IUploadNewEmployeePhotoImages
    {
        private string connString = GlobalValues.ConnectionString;
        private readonly AzureStorageAccountsOptions? _azureOptions;
        private readonly ParamUploadPhotoImageModel? _photoImages;

        public UploadNewEmployeePhotoImageDataAccess(ParamUploadPhotoImageModel photoImages, AzureStorageAccountsOptions azureOptions)
        {
            _photoImages = photoImages;
            _azureOptions = azureOptions;
        }

        public bool UploadPhotoImagesToAzureStorage()
        {
            try
            {
                var file = _photoImages.ImageFile;
                using MemoryStream fileUploadStream = new MemoryStream();
                file.CopyTo(fileUploadStream);
                fileUploadStream.Position = 0;
                BlobContainerClient blobContainerClient = new BlobContainerClient(
                    _azureOptions.ConnectionString,
                    _azureOptions.Container);
                BlobClient blobClient = blobContainerClient.GetBlobClient(_photoImages.FileName);
                blobClient.Upload(fileUploadStream, new BlobUploadOptions()
                {
                    HttpHeaders = new BlobHttpHeaders
                    {
                        ContentType = "image/jpeg"
                    }
                }, cancellationToken: default);

                return true;
            }
            catch
            {
                return false;
            }

        }

        async public Task<ReturnUploadNewEmployeePhotoImageModel> UploadPhotoImages()
        {

            ReturnUploadNewEmployeePhotoImageModel dataModel = new();

            bool isUploadSuccessful = this.UploadPhotoImagesToAzureStorage();
            if (!isUploadSuccessful)
            {
                dataModel.StatusCodeNumber = 0;
                return dataModel;
            }
            else
            {
                using (SqlConnection conn = new SqlConnection(connString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        cmd.Connection = conn;
                        cmd.CommandText = "[speedx.hrms.master].[spSavePhotoImageFileName]";
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.Add(new SqlParameter("@masterPersonUserID", SqlDbType.Int));
                        cmd.Parameters["@masterPersonUserID"].Value = _photoImages.UserMasterPersonID;

                        cmd.Parameters.Add(new SqlParameter("@masterPersonID", SqlDbType.Int));
                        cmd.Parameters["@masterPersonID"].Value = _photoImages.MasterPersonID;

                        cmd.Parameters.Add(new SqlParameter("@photoImageFileName", SqlDbType.NVarChar));
                        cmd.Parameters["@photoImageFileName"].Value = _photoImages.FileName;



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
                                    dataModel.PhotoImageFileName = reader["PhotoImageFileName"].ToString();
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
}




