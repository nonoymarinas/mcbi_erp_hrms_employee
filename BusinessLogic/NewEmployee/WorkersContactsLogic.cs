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
	public class WorkersContactsLogic : ISaveContacts,IUpdateContacts
	{
	
		private readonly ParamContactModel? _contacts;
        private readonly ParamUpdateContactsModel? _updateContacts;

        public WorkersContactsLogic(ParamContactModel contacts)
		{
			_contacts = contacts;
		}
        public WorkersContactsLogic(ParamUpdateContactsModel updateContacts)
        {
            _updateContacts = updateContacts;
        }
        async public Task<ReturnSaveContactModel> SaveContacts()
		{
			SaveContactsDataAccess dataAccessData = new(_contacts);
			return await dataAccessData.SaveContacts();
		}

        async public Task<ReturnUpdateContactModel> UpdateContacts()
        {
			UpdateContactsDataAccess dataAccessData = new(_updateContacts);
			return await dataAccessData.UpdateContacts();
		}
    }
}
