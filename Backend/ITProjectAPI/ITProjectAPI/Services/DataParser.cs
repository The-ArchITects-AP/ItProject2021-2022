using System;
namespace ITProjectAPI.Services
{
    public static class DataParser
    {
        
        public static string GetEigenVermogen(string input)
        {

            var lengteBeginString = "<pfs:Equity decimals=\"INF\" contextRef=\"CurrentInstant\" unitRef=\"U - EUR\">".Length;

            var startpositie = input.IndexOf("<pfs:Equity decimals=\"INF\" contextRef=\"CurrentInstant\" unitRef=\"U - EUR\">") + lengteBeginString;
            var eindpositie = input.IndexOf("</pfs:Equity>", startpositie);
            var lengte = eindpositie - startpositie;
            var resultaat = input.Substring(startpositie, lengte);

            return resultaat;
        }

        public static string GetSchulden(string input)
        {
            return "roekoekoe";
        }

        public static string GetSchulden(string input)
        {
            var lengteBeginString = "<pfs:AmountsPayable decimals=\"INF\" contextRef=\"CurrentInstant\" unitRef=\"U - EUR\">".Length;
            var startpositie = input.IndexOf("<pfs:AmountsPayable decimals=\"INF\" contextRef=\"CurrentInstant\" unitRef=\"U - EUR\">") + lengteBeginString;
            var eindpositie = input.IndexOf("</pfs:AmountsPayable>", startpositie);
            var lengte = eindpositie - startpositie;
            var resultaat = input.Substring(startpositie, lengte);

            return resultaat;
        }

    }
}
