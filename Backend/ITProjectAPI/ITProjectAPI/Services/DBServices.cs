using ITProjectAPI.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using ITProjectAPI.Viewmodels;
using System.Net.Http;

namespace ITProjectAPI.Services
{
   public class DBServices : IDBServices
    {
        public DBServices()
        {
        }

        public List<NameView> GetLastNames()
        {
            List<NameView> result = new List<NameView>();
            //haal op in de datbase
            return result;
        }

    }
}
