using ITProjectAPI.Models;
using ITProjectAPI.Viewmodels;
using System.Collections.Generic;
using System.IO;
namespace ITProjectAPI.Services

{
    public interface IDBServices
    {
       List<NameView> GetLastNames();
        
    }
}




