using System;
using System.Collections.Generic;
using System.Net.Http;
using ITproject.Models;
using Newtonsoft.Json;
namespace ITproject

{
    public class NBBapi:IGetreference
    {

        private string _url = "https://ws.uat2.cbso.nbb.be/authentic/legalEntity/{KBOnummer}/references";


        public NBBapi(string url)
        {
            _url = url;
        }

        public NBBapi()
        {

        }

        public void GetReferences(string KBOnummer)
        {

            using (var client = new HttpClient())
            {

                //client-configuration

                client.DefaultRequestHeaders.Add("X-Request-Id", "6457dc94-0b98-4c1a-b5f8-98d8627b5177");                                        //version 4 UUID is required
                client.DefaultRequestHeaders.Add("NBB-CBSO-Subscription-Key", "f03301a6bfbe4f2897fd2b3df935e0bd");                               //subscription-key is required
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));        //Accept type is required




                var response = client.GetAsync(_url).GetAwaiter().GetResult();
                response.EnsureSuccessStatusCode();
                var stringresponse = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();


                //response in lijst van refrence model-object steken
                List<ReferenceModel> referencemodels = JsonConvert.DeserializeObject<List<ReferenceModel>>(stringresponse);


                Console.WriteLine($"De naam van het bedrijf is: {referencemodels[0].EnterpriseName}");
                Console.WriteLine();

            }

        }
    }
}
