using ITProjectAPI.Models;
using ITProjectAPI.Services;
using ITProjectAPI.Viewmodels;
using Microsoft.AspNetCore.Mvc;

namespace ITProjectAPI.Controllers
{
    [Route("Home")]
    public class HomeController : Controller
    {

        private INbbApi _apiService;

        public HomeController(INbbApi apiService)
        {
            _apiService = apiService;
        }


        //pakt de KBO-nummer als string; returned NameView 

        [HttpGet("gegevens/{kbonummer}")]
        public IActionResult GetName(string kbonummer)
        {

            var dataReferenceNumber = _apiService.GetReferences(kbonummer);

            if (dataReferenceNumber == null)
            {
                return NotFound("Gelieve een geldig KBO-nummer in te geven");
            }

            var result = new NameView()
            {
                EnterpriseName = dataReferenceNumber[0].EnterpriseName,
                Street = dataReferenceNumber[0].Address.Street,
                Number = dataReferenceNumber[0].Address.Number,
                PostalCode = dataReferenceNumber[0].Address.PostalCode,
                City = dataReferenceNumber[0].Address.City
            };

            return  Ok(result);
        }



        //pakt KBO-nummer als string; geeft AccountingView terug

        [HttpGet("accountingdata/{kbonummer}")]
        public IActionResult GetAccountingData (string kbonummer)

        {

            var dataReferenceNumber = _apiService.GetReferences(kbonummer);                                     //haalt alle referentienummers op via 1e api-call

            if (dataReferenceNumber == null)
            {
                return NotFound("Gelieve een geldig KBO-nummer in te geven");
            }

            else
            {
                var mostRecentRef = _apiService.GetMostRecent(dataReferenceNumber).ReferenceNumber;             //haalt uit de lijst de meest recente referentie en depositdate
                var mostRecentDepositDate = _apiService.GetMostRecent(dataReferenceNumber).DepositDate;

                var accountingData = _apiService.GetAccountingData(mostRecentRef);                              //haalt de accountingdata van meest recente refnummer via 2e api-call



                var result = new AccountingView()
                {
                    DepositDate = mostRecentDepositDate.ToString("d"),
                    EigenVermogen = DataParser.GetEigenVermogen(accountingData),
                    Bedrijfswinst = DataParser.GetBedrijfswinst(accountingData),
                    Schulden = DataParser.GetSchulden(accountingData)

                };

                return new ObjectResult(result);
            }

        }

    }
}
