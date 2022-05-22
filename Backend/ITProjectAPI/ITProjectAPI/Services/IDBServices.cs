using ITProjectAPI.Models;
using System.Collections.Generic;


namespace ITProjectAPI.Services
{
    
    public interface IDBServices
    {
        IEnumerable<ReferenceModel> GetLastNames();
        void Add(ReferenceModel newReferenceModel);
        void Addaccounting(AccountingModel newAccountingModel);
        IEnumerable<AccountingModel> GetAccountingData(string refnummer);
    }
}


