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


        //pakt de KBO-nummer als string; returned de naam als string 

        [HttpGet("{kbonummer}")]

        public IActionResult GetName (string kbonummer)
        {

            var dataReferenceNumber = _apiService.GetReferences(kbonummer);
           
            if (dataReferenceNumber == null)
            {
                return NotFound();
            }

            var result = dataReferenceNumber[0].EnterpriseName;

            return  Ok(result);
        }



        //geeft de accountingdata weer van een desbetreffend KBO-nummer via home/accountingdata/kbonummer

        [HttpGet("/accountingdata/{kbonummer}")]

        public IActionResult GetAccountingData (string kbonummer)

        {

            var dataReferenceNumber = _apiService.GetReferences(kbonummer);                 //haalt alle referentienummer op via eerste api-call
            var mostRecentRef = _apiService.GetMostRecent(dataReferenceNumber);             //haalt uit de lisjt de meest recente referentie
            var accountingData  = _apiService.GetAccountingData(mostRecentRef);             //haalt de accountingdata van deze meest recente refnummer


            if (accountingData == null)
            {
                return NotFound();
            }


        // HIER nog via op een parsingmethode oproepen om de juiste info te extraheren
        //en dan een Viewmodel opvullen met de juiste data en die terugsturen

        return new ObjectResult(accountingData);

        }

    }
}
