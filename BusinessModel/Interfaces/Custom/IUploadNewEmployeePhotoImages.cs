using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessModel
{
	public interface IUploadNewEmployeePhotoImages
	{
		public Task<ReturnUploadNewEmployeePhotoImageModel> UploadPhotoImages();
	}
}
