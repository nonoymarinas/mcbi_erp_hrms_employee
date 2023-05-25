using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using BusinessModel;
using DataAccess;

namespace BusinessLogic
{
	public class WorkersBenifitsLogic : ISaveBenifits, IUpdateBenifits
	{
		
		private readonly ParamSaveBenifitsModel? _benifits;
        private readonly ParamUpdateBenifitsModel? _updateBenifits;


        public WorkersBenifitsLogic(ParamSaveBenifitsModel benifits)
		{
			_benifits = benifits;
		}
        public WorkersBenifitsLogic(ParamUpdateBenifitsModel updateBenifits)
        {
            _updateBenifits = updateBenifits;
        }

        async public Task<ReturnSaveBenifitsModel> SaveBenifits()
		{
			SaveBenifitsDataAccess dataAccessData = new(_benifits);
			return await dataAccessData.SaveBenifits();
		}

		async public Task<ReturnUpdateBenifitsModel> UpdateBenifits()
        {
			UpdateBenifitsDataAccess dataAccessData = new(_updateBenifits);
			return await dataAccessData.UpdateBenifits();
		}
    }
}
