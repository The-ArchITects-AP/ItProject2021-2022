using System;
namespace ITProjectAPI.Services
{
    public static class DataParser
    {
        
        public static string GetEigenVermogen(string input)
        {
            var tezoeken = "<met:am2 contextRef=\"c42\" id=\"f42\" decimals=\"INF\" unitRef=\"EUR\">";

            var lengteBeginString = tezoeken.Length;
            var startpositie = input.IndexOf(tezoeken) + lengteBeginString;
            var eindpositie = input.IndexOf("</met:am2>", startpositie);
            var lengte = eindpositie - startpositie;
            var resultaat = input.Substring(startpositie, lengte);

            return resultaat;
        }

        public static string GetSchulden(string input)
        {
            var tezoeken = "<met:am1 contextRef=\"c56\" id=\"f56\" decimals=\"INF\" unitRef=\"EUR\">";

            var lengteBeginString = tezoeken.Length;
            var startpositie = input.IndexOf(tezoeken) + lengteBeginString;
            var eindpositie = input.IndexOf("</met:am1>", startpositie);
            var lengte = eindpositie - startpositie;
            var resultaat = input.Substring(startpositie, lengte);

            return resultaat;
        }

        public static string GetBedrijfswinst(string input)
        {
            var tezoeken = "<met:am2 contextRef=\"c91\" id=\"f91\" decimals=\"INF\" unitRef=\"EUR\">";

            var lengteBeginString = tezoeken.Length;
            var startpositie = input.IndexOf(tezoeken) + lengteBeginString;
            var eindpositie = input.IndexOf("</met:am2>", startpositie);
            var lengte = eindpositie - startpositie;
            var resultaat = input.Substring(startpositie, lengte);

            return resultaat;
        }
    }
}
