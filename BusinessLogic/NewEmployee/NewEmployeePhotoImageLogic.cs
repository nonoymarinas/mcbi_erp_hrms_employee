using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessModel;
using DataAccess;

namespace BusinessLogic
{
    public class NewEmployeePhotoImageLogic:IUploadNewEmployeePhotoImages
    {
        private readonly ParamUploadPhotoImageModel _image;
        private readonly AzureStorageAccountsOptions _azureoptions;
        public NewEmployeePhotoImageLogic()
        {

        }

        public NewEmployeePhotoImageLogic(ParamUploadPhotoImageModel image,AzureStorageAccountsOptions azureoptions)
        {
            _image = image;
            _azureoptions = azureoptions;
        }

        async public Task<ReturnUploadNewEmployeePhotoImageModel> UploadPhotoImages()
        {
            string fileExtension = Path.GetExtension(_image.ImageFile.FileName);
            var uniqueName = Guid.NewGuid().ToString() + fileExtension;
            _image.FileName = uniqueName;

            UploadNewEmployeePhotoImageDataAccess dataAccess = new(_image, _azureoptions);
            return await dataAccess.UploadPhotoImages();
        }
    }
}
