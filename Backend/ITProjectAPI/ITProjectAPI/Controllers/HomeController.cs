using Microsoft.AspNetCore.Mvc;

namespace ITProjectAPI.Controllers
{
    public class HomeController : Controller
    {
        
        public HomeController() 
        {
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            /*var bankAccount = _bankAccountRepository.Get(id);
            if (bankAccount == null)
            {
                return NotFound();
            }
            return Ok(bankAccount);*/
            return null;
        }
    }
}
