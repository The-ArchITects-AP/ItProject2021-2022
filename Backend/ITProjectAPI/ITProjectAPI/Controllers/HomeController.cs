using ITProjectAPI.Services;
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


        //geeft de referentienummer van de meest recente neerlegging via home/kbonummer

        [HttpGet("{kbonummer}")]

        public IActionResult GetMostRecentRef (string kbonummer)
        {

            var dataReferenceNumber = _apiService.GetReferences(kbonummer);
           
            if (dataReferenceNumber == null)
            {
                return NotFound();
            }

            var result = _apiService.GetMostRecent(dataReferenceNumber);

            return  Ok(result);
        }



        //geeft de accountingdata weer van een desbetreffend referentienummer via home/accountingdata/referentienummer

        [HttpGet("/accountingdata/{referentienummer}")]

        public IActionResult GetAccountingData (string referentienummer)

        {
            var AccountingData  = _apiService.GetAccountingData(referentienummer);


            if (AccountingData == null)
            {
                return NotFound();
            }

        // HIER nog via op een parsingmethode oproepen om de juiste info te extraheren
        //en dan een Viewmodel opvullen met de juiste data en die terugsturen

        return new ObjectResult(AccountingData);

        }

    }
}
