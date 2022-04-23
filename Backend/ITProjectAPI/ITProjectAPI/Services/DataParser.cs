using System;
namespace ITProjectAPI.Services
{
    public static class DataParser
    {
        
        public static string GetEigenVermogen(string input, string modeltype)
        {
            string tezoeken = String.Empty;

            switch (modeltype)
            {
                case "m07-f":
                    tezoeken = "contextRef=\"c42\" id=\"f42\" decimals=\"INF\" unitRef=\"EUR\">";
                    break;


                default:
                    break;
            }

            

            var lengteBeginString = tezoeken.Length;
            var startpositie = input.IndexOf(tezoeken) + lengteBeginString;
            var eindpositie = input.IndexOf("</met:am", startpositie);
            var lengte = eindpositie - startpositie;
            var resultaat = input.Substring(startpositie, lengte);

            return resultaat;
        }



        public static string GetSchulden(string input, string modeltype)
        {
            var tezoeken = "contextRef=\"c56\" id=\"f56\" decimals=\"INF\" unitRef=\"EUR\">";

            var lengteBeginString = tezoeken.Length;
            var startpositie = input.IndexOf(tezoeken) + lengteBeginString;
            var eindpositie = input.IndexOf("</met:am", startpositie);
            var lengte = eindpositie - startpositie;
            var resultaat = input.Substring(startpositie, lengte);

            return resultaat;
        }

        public static string GetBedrijfswinst(string input, string modeltype)
        {
            var tezoeken = "contextRef=\"c91\" id=\"f91\" decimals=\"INF\" unitRef=\"EUR\">";

            var lengteBeginString = tezoeken.Length;
            var startpositie = input.IndexOf(tezoeken) + lengteBeginString;
            var eindpositie = input.IndexOf("</met:am", startpositie);
            var lengte = eindpositie - startpositie;
            var resultaat = input.Substring(startpositie, lengte);

            return resultaat;
        }
    }
}
