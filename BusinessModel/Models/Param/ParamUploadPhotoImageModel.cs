using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
namespace BusinessModel
{
	public class ParamUploadPhotoImageModel
	{
		public int UserMasterPersonID { get; set; }
		public int MasterPersonID { get; set; }
		public IFormFile? ImageFile { get; set; }
		public string? FileName { get; set; }
		public int StatusCodeNumber { get; set; } = 1;
	}
}
