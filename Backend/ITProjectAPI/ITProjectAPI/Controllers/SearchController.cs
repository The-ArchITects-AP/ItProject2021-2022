using System.Collections.Generic;
using System.Linq;
using ITProjectAPI.Models;
using ITProjectAPI.Services;
using ITProjectAPI.Viewmodels;
using Microsoft.AspNetCore.Mvc;

namespace ITProjectAPI.Controllers
{
    [Route("search")]
    public class SearchController : Controller
    {

        private IDBServices _dbService;

        public SearchController(IDBServices dbService)
        {
            _dbService = dbService;
        }


        //van zodra men naar searchpagina gaat, haal de laatste vier adresgegevens op uit DB

        [HttpGet("all")]
        public IActionResult GetNames()
        {
            // response-headers nodig voor frontend
            HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            HttpContext.Response.Headers.Add("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS");
            HttpContext.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, Authorization,Content-lenght,X-Requested-With");

            var dbfetch = _dbService.GetLastNames();

            if (dbfetch == null)
            {
                return NotFound("nog geen searches gedaan");
            }

            var result = new List<NameView>();                              //list van NameView maken


            foreach (var item in dbfetch)                                   //voor elk item vanuit de DBfetch een nameView maken en aan de lijst toevoegen
            {
                var temp = new NameView()
                {
                    EnterpriseName = item.EnterpriseName,
                    Street = item.Address.Street,
                    Number = item.Address.Number,
                    PostalCode = item.Address.PostalCode,
                    City = item.Address.City
                };
                result.Add(temp);
            }

            return Ok(result);
        }

        [HttpGet("alldata")]
        public IActionResult GetAllData()
        {
            // response-headers nodig voor frontend
            HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            HttpContext.Response.Headers.Add("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS");
            HttpContext.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, Authorization,Content-lenght,X-Requested-With");

            List<ReferenceModel> dbfetchNames = _dbService.GetLastNames().ToList();

            if (dbfetchNames == null)
            {
                return NotFound("nog geen searches gedaan");
            }


            var result = new List<FullView>();

            foreach (var item in dbfetchNames)                                                              //voor elk item in de lijst geef Referencenumber door aan getAccountingdata

            {
                var accountingdata = _dbService.GetAccountingData(item.ReferenceNumber);                    //accountingdata ophalen voor de referencenumbers


                var temp = new FullView()                                                                   // fullview wordt opgevuld door dbfetchNames en door accountingdata
                {
                    EnterpriseName = item.EnterpriseName,
                    Street = item.Address.Street,
                    Number = item.Address.Number,
                    PostalCode = item.Address.PostalCode,
                    City = item.Address.City,
                    DepositDate = item.DepositDate.ToString("d"),
                    EigenVermogen = DataParser.GetEigenVermogen(accountingdata),
                    Schulden = DataParser.GetSchulden(accountingdata),
                    Bedrijfswinst = DataParser.GetBedrijfswinst(accountingdata),

                };

                result.Add(temp);
            }

            return Ok(result);
        }


        [HttpGet("searchquery/{input}")]

        public IActionResult GetSearch(string input)
        {
            // response-headers nodig voor frontend
            HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            HttpContext.Response.Headers.Add("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS");
            HttpContext.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, Authorization,Content-lenght,X-Requested-With");

            var dbfetch = _dbService.GetSearch(input);

            if (dbfetch is null)
            {
                return NotFound("Deze KBO-nummer/bedrijfsnaam staat niet in de database");
            }

            var accountingdata = _dbService.GetAccountingData(dbfetch.ReferenceNumber);

            var result = new FullView()
            {
                EnterpriseName = dbfetch.EnterpriseName,
                Street = dbfetch.Address.Street,
                Number = dbfetch.Address.Number,
                PostalCode = dbfetch.Address.PostalCode,
                City = dbfetch.Address.City,
                DepositDate = dbfetch.DepositDate.ToString("d"),
                EigenVermogen = DataParser.GetEigenVermogen(accountingdata),
                Schulden = DataParser.GetSchulden(accountingdata),
                Bedrijfswinst = DataParser.GetBedrijfswinst(accountingdata),
            };

            return Ok(result);

        }
    }
}