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
	public class WorkersCompensationLogic : ISaveCompensation
	{
	
		private readonly ParamCompensationModel? _compensation;
        private readonly ParamUpdateCompensationModel? _updateCompensation;


        public WorkersCompensationLogic(ParamCompensationModel compensation)
		{
			_compensation = compensation;
		}

        public WorkersCompensationLogic(ParamUpdateCompensationModel updateCompensation)
        {
            _updateCompensation = updateCompensation;
        }

        async public Task<ReturnSaveCompensationModel> SaveCompensation()
        {
			SaveCompensationDataAccess dataAccessData = new(_compensation);
			return await dataAccessData.SaveCompensation();
		}

        async public Task<ReturnUpdateCompensationModel> UpdateCompensation()
        {
            UpdateCompensationDataAccess dataAccessData = new(_updateCompensation);
            return await dataAccessData.UpdateCompensation();
        }


    }
}
