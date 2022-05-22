using ITProjectAPI.Models;
using System.Collections.Generic;


namespace ITProjectAPI.Services
{
    public interface INbbApi
    {
        List<ReferenceModel> GetReferences(string kbonummer);
        ReferenceModel GetMostRecent(List<ReferenceModel> lijst);
        AccountingModel GetAccountingData(string referentienummer);
    }
}
