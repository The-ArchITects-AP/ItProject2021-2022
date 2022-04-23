using System;
namespace ITProjectAPI.Services
{
    public static class DataParser
    {
        
        public static string GetEigenVermogen(string input, string modeltype)
        {

            string contextID = String.Empty;
            
            switch (modeltype)
            {
                case "m07-f":
                    contextID = "42";
                    break;

                case "m04-f":
                    contextID = "44";
                    break;

                case "m01-f":
                    contextID = "21";
                    break;

                case "m81-f":
                    contextID = "46";
                    break;

                case "m02-f":
                    contextID = "64";
                    break;

                case "m87-f":
                    contextID = "";
                    break;

                case "m08-f":
                    contextID = "";
                    break;

                case "m05-f":
                    contextID = "";
                    break;

                default:
                    break;
            }

            string tezoeken = $"contextRef=\"c{contextID}\" id=\"f{contextID}\" decimals=\"INF\" unitRef=\"EUR\">";

            var lengteBeginString = tezoeken.Length;
            var startpositie = input.IndexOf(tezoeken) + lengteBeginString;
            var eindpositie = input.IndexOf("</met:am", startpositie);
            var lengte = eindpositie - startpositie;
            var resultaat = input.Substring(startpositie, lengte);

            return resultaat;
        }



        public static string GetSchulden(string input, string modeltype)
        {

            string contextID = String.Empty;

            switch (modeltype)
            {
                case "m07-f":
                    contextID = "56";
                    break;

                case "m04-f":
                    contextID = ""; 
                    break;

                case "m01-f":
                    contextID = "";
                    break;

                case "m81-f":
                    contextID = "";
                    break;

                case "m02-f":
                    contextID = "";
                    break;

                case "m87-f":
                    contextID = "";
                    break;

                case "m08-f":
                    contextID = "";
                    break;

                case "m05-f":
                    contextID = "";
                    break;

                default:
                    break;
            }

            string tezoeken = $"contextRef=\"c{contextID}\" id=\"f{contextID}\" decimals=\"INF\" unitRef=\"EUR\">";

            var lengteBeginString = tezoeken.Length;
            var startpositie = input.IndexOf(tezoeken) + lengteBeginString;
            var eindpositie = input.IndexOf("</met:am", startpositie);
            var lengte = eindpositie - startpositie;
            var resultaat = input.Substring(startpositie, lengte);

            return resultaat;
        }



        public static string GetBedrijfswinst(string input, string modeltype)
        {
            string contextID = String.Empty;

            switch (modeltype)
            {
                case "m07-f":
                    contextID = "91";
                    break;

                case "m04-f":
                    contextID = "";
                    break;

                case "m01-f":
                    contextID = "";
                    break;

                case "m81-f":
                    contextID = "";
                    break;

                case "m02-f":
                    contextID = "";
                    break;

                case "m87-f":
                    contextID = "";
                    break;

                case "m08-f":
                    contextID = "";
                    break;

                case "m05-f":
                    contextID = "";
                    break;

                default:
                    break;
            }

            var tezoeken = $"contextRef=\"c{contextID}\" id=\"f{contextID}\" decimals=\"INF\" unitRef=\"EUR\">";

            var lengteBeginString = tezoeken.Length;
            var startpositie = input.IndexOf(tezoeken) + lengteBeginString;
            var eindpositie = input.IndexOf("</met:am", startpositie);
            var lengte = eindpositie - startpositie;
            var resultaat = input.Substring(startpositie, lengte);

            return resultaat;
        }
    }
}
