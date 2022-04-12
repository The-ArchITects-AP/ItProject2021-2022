﻿using ITProjectAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace ITProjectAPI.Controllers
{
    [Route("{Home}")]
    public class HomeController : Controller
    {

        private INbbApi _apiService;

        public HomeController(INbbApi apiService)
        {
            _apiService = apiService;
        }



        [HttpGet("{kbonummer}")]

        public IActionResult GetName(string kbonummer)
        {
            var dataReferenceNumber = _apiService.GetReferences(kbonummer);
           

            if (dataReferenceNumber == null)
            {
                return NotFound();
            }

            var result = _apiService.GetMostRecent(dataReferenceNumber);


            return new ObjectResult(result);
        }
    }
}
