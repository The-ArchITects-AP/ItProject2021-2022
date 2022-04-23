using ITProjectAPI.Models;
using System.Collections.Generic;
using System.IO;

namespace ITProjectAPI.Services
{
    public interface INbbApi
    {
        List<ReferenceModel> GetReferences(string kbonummer);
        ReferenceModel GetMostRecent(List<ReferenceModel> lijst);
        string GetAccountingData(string referentienummer);
    }
}
