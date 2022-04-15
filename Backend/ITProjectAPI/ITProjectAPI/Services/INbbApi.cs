using ITProjectAPI.Models;
using System.Collections.Generic;

namespace ITProjectAPI.Services
{
    public interface INbbApi
    {
        List<ReferenceModel> GetReferences(string kbonummer);
        string GetMostRecent(List<ReferenceModel> lijst);
        string GetAccountingData(string referentienummer);
    }
}
