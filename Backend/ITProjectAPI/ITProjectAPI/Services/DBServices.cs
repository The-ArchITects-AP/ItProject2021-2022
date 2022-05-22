using ITProjectAPI.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using ITProjectAPI.Viewmodels;
using System.Net.Http;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace ITProjectAPI.Services
{
   public class DBServices:IDBServices
    {

        private NbbDbContext _context;

        public DBServices(NbbDbContext context)
        {
            _context = context;
        }


        //geeft alle referencemodels van DB terug

        public IEnumerable<ReferenceModel> GetLastNames()
        {
            return _context.ReferenceModels.Include(x => x.Address).OrderByDescending(x => x.Id).Take(4);
        }

        //voegt een referencemodel toe
        public void Add (ReferenceModel newReferenceModel)
        {
            _context.ReferenceModels.Add(newReferenceModel);
            _context.SaveChanges();
        }

        //voegt de accountingdata toe

        public void Addaccounting(AccountingModel newAccountingModel)
        {
            _context.AccountingModels.Add(newAccountingModel);
            _context.SaveChanges();
        }


    }
}
