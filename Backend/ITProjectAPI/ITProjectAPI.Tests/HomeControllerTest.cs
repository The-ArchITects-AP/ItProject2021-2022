using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ITProjectAPI.Viewmodels;

namespace ITProjectAPI.Tests
{
    [TestClass]
    public class HomeControllerTest
    {
        [TestMethod]
        public void GetNameTest()
        {
            string kbonummer = "0679720570";
            NameView result = new NameView()
            {
                EnterpriseName = "ROGER VDK+",
                Street = "Bollaardstraat",
                Number = "17",
                PostalCode = "8800",
                City = "Roeselare"
            };
            //OkObjectResult expected = ControllerBase.Ok();
        }
    }
}
