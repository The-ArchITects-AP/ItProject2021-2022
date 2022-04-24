using ITProjectAPI.Models;
using System.Linq;

namespace ITProjectAPI.Services
{

    public static class DataParser
    {

        public static string GetEigenVermogen(AccountingModel input)
        {
            var item = input.Rubrics.FirstOrDefault(x => x.Code == "10/15" && x.Period == "N");

            if (item is null)
            {
                return "geen data beschikbaar";

            }

            return item.Value;
        }


        public static string GetSchulden(AccountingModel input)
        {

            var item = input.Rubrics.FirstOrDefault(x => x.Code == "17/49" && x.Period == "N");

            if (item is null)
            {
                return "geen data beschikbaar";

            }

            return item.Value;
        }


        public static string GetBedrijfswinst(AccountingModel input)
        {

            var item = input.Rubrics.FirstOrDefault(x => x.Code == "9901" && x.Period == "N");

            if (item is null)
            {
                return "geen data beschikbaar";

            }

            return item.Value;
        }











        //helemaal mis, gaan we via jsonxbrl doen


        //public static string GetBedrijfswinst(string input, string modeltype)
        //{
        //    string contextID = String.Empty;

        //    switch (modeltype)
        //    {
        //        case "m07-f":
        //            contextID = "91";
        //            break;

        //        case "m04-f":
        //            contextID = "72";
        //            break;

        //        case "m01-f":
        //            contextID = "81";
        //            break;

        //        case "m81-f":
        //            contextID = "";
        //            break;

        //        case "m02-f":
        //            contextID = "";
        //            break;

        //        case "m87-f":
        //            contextID = "";
        //            break;

        //        case "m08-f":
        //            contextID = "";
        //            break;

        //        case "m05-f":
        //            contextID = "";
        //            break;

        //        default:
        //            break;
        //    }

        //    var tezoeken = $"contextRef=\"c{contextID}\" id=\"f{contextID}\" decimals=\"INF\" unitRef=\"EUR\">";

        //    var lengteBeginString = tezoeken.Length;
        //    var startpositie = input.IndexOf(tezoeken) + lengteBeginString;
        //    var eindpositie = input.IndexOf("</met:am", startpositie);
        //    var lengte = eindpositie - startpositie;
        //    var resultaat = input.Substring(startpositie, lengte);

        //    return resultaat;
        //}
    }
}
