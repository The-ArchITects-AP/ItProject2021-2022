using ITProjectAPI.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;

namespace ITProjectAPI.Services
{
    public class NbbApi : INbbApi
    {

        private string _url = "http://localhost:3000/legalEntity/";

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
                client.DefaultRequestHeaders.Add("NBB-CBSO-Subscription-Key", "f03301a6bfbe4f2897fd2b3df935e0bd");                               //subscription-key is required
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));        //Accept type is required

                _url = $"{_url}{KBOnummer}/references";

                var response = client.GetAsync(_url).GetAwaiter().GetResult();
                //response.EnsureSuccessStatusCode();
                var stringresponse = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();

                //response in lijst van refrence model-object steken
                List<ReferenceModel> referencemodels = JsonConvert.DeserializeObject<List<ReferenceModel>>(stringresponse);

                return referencemodels;
            }
        }



        //methode om de meest recente neerlegging te bepalen

        public string GetMostRecent(List<ReferenceModel> lijst)
        {

            int indexrecent = 0;

            for (int i = 0; i < lijst.Count - 1; i++)
            {
                if (lijst[i].DepositDate < lijst[i + 1].DepositDate)
                {
                    indexrecent = i + 1;
                }
            }

            return $"{lijst[indexrecent].ReferenceNumber}";
        }



        //methode om via HTTP-call, met een referentienummer de accountingdata op te halen

        public string GetAccountingData (string referentienummer)
        {
            using (var client = new HttpClient())
            {
                //client-configuration
                client.DefaultRequestHeaders.Add("X-Request-Id", "6457dc94-0b98-4c1a-b5f8-98d8627b5177");                                        //version 4 UUID is required
                client.DefaultRequestHeaders.Add("NBB-CBSO-Subscription-Key", "f03301a6bfbe4f2897fd2b3df935e0bd");                               //subscription-key is required
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));        //Accept type is required

                _url = $"{_url}{referentienummer}/references";

                var response = client.GetAsync(_url).GetAwaiter().GetResult();
                //response.EnsureSuccessStatusCode();
                var stringresponse = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();

                return stringresponse;
            }
        }

    }
}
