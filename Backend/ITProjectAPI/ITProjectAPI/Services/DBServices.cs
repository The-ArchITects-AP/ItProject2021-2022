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



        //geeft de accountingdata terug

        public IEnumerable<AccountingModel> GetAccountingData(string refnummer)
        {
            return _context.AccountingModels.Where(x => x.ReferenceNumber == refnummer).Include(x => x.Rubrics);
        }


        //doet en search op kbonummer, als deze lijst leeg is dan zoekt hij op ondernemingsnaam

        public ReferenceModel GetSearch(string input)
        {
            var result = _context.ReferenceModels.Include(x => x.Address).FirstOrDefault(x => x.EnterpriseNumber == input);
            if (result is null)
            {
                result = _context.ReferenceModels.Include(x => x.Address).FirstOrDefault(x => x.EnterpriseName.Contains(input));
            }
            return result;
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
