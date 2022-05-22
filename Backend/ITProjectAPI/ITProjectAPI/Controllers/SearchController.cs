using System;
using System.Collections.Generic;
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

            var result = new List<NameView>();
            

            foreach (var item in dbfetch)
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

    }
}