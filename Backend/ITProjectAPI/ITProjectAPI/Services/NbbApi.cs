using ITProjectAPI.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;

namespace ITProjectAPI.Services
{
    public class NbbApi : INbbApi
    {

        private string _url = "https://ws.uat2.cbso.nbb.be/authentic/";

        public NbbApi(string url)
        {
            _url = url;
        }

        public NbbApi()
        {
        }


        //methode om via HTTP-call de lijst van referentie-nummers terug te krijgen

        public List<ReferenceModel> GetReferences(string KBOnummer)
        {
            using (var client = new HttpClient())
            {
                //client-configuration
                client.DefaultRequestHeaders.Add("X-Request-Id", "6457dc94-0b98-4c1a-b5f8-98d8627b5177");                                        //version 4 UUID is required
                client.DefaultRequestHeaders.Add("NBB-CBSO-Subscription-Key", "263deb8f945342b9b7eabee7040cc130");                               //subscription-key is required
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));        //Accept type is required

                
                string url = $"{_url}legalEntity/{KBOnummer}/references";

                var response = client.GetAsync(url).GetAwaiter().GetResult();
                var succes = response.IsSuccessStatusCode;

                if (succes)
                {
                    var stringresponse = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();

                    //response in lijst van reference model-object steken
                    List<ReferenceModel> referencemodels = JsonConvert.DeserializeObject<List<ReferenceModel>>(stringresponse);

                    return referencemodels;
                }
                else
                {
                    return null;
                }
            }
        }



        //methode om de meest recente neerlegging te bepalen, returned het meest recente reference

        public ReferenceModel GetMostRecent(List<ReferenceModel> lijst)
        {

            int indexrecent = 0;

            for (int i = 0; i < lijst.Count - 1; i++)
            {
                if (lijst[i].DepositDate < lijst[i + 1].DepositDate)
                {
                    indexrecent = i + 1;
                }

                else if (lijst[i].DepositDate == lijst[i + 1].DepositDate)
                {
                    if (lijst[i].ExerciseDates.endDate < lijst[i + 1].ExerciseDates.endDate)
                    {
                        indexrecent = i + 1;
                    }    
            
                }
            }

            return lijst[indexrecent];
        }



        //methode om via HTTP-call, met een referentienummer de accountingdata op te halen

        public AccountingModel GetAccountingData (string referentienummer)
        {
            using (var client = new HttpClient())
            {
                //client-configuration
                client.DefaultRequestHeaders.Add("X-Request-Id", "6457dc94-0b98-4c1a-b5f8-98d8627b5177");                                       
                client.DefaultRequestHeaders.Add("NBB-CBSO-Subscription-Key", "263deb8f945342b9b7eabee7040cc130");                               
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/x.jsonxbrl"));       //hier krijg je de accountingdata terug in json

                string url = $"{_url}deposit/{referentienummer}/accountingData";
                //string url = $"http://localhost:3000/accountingData/{referentienummer}";

                var response = client.GetAsync(url).GetAwaiter().GetResult();
                //response.EnsureSuccessStatusCode();
                var stringresponse = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();

                //json mappen in een accountingmodel
                AccountingModel accountingmodel = JsonConvert.DeserializeObject<AccountingModel>(stringresponse);

                return accountingmodel;
            }
        }

    }
}
