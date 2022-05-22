using System;
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

            foreach (var item in dbfetchNames)

            {
               var accountingdata = _dbService.GetAccountingData(item.ReferenceNumber).ToList();


                var temp = new FullView()
                {
                    EnterpriseName = item.EnterpriseName,
                    Street = item.Address.Street,
                    Number = item.Address.Number,
                    PostalCode = item.Address.PostalCode,
                    City = item.Address.City,
                    DepositDate = item.DepositDate.ToString("d"),
                    EigenVermogen = DataParser.GetEigenVermogen(accountingdata[0]),
                    Schulden = DataParser.GetSchulden(accountingdata[0]),
                    Bedrijfswinst = DataParser.GetBedrijfswinst (accountingdata[0]),

                };

                result.Add(temp);
            }

            return Ok(result);
        }

    }
}