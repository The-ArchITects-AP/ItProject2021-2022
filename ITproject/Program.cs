using System;
using System.Collections.Generic;
using System.Net.Http;
using ITproject.Models;
using Newtonsoft.Json;



namespace ITproject

{
    class Program                                               /*Http-Client die de NBB api gaat aanspreken */
    {
        static void Main(string[] args)
        {
            while (true)
            {

                Console.Write("Please enter a KBO number (q to quit): ");
                string answer = Console.ReadLine();

                if (answer == "q")
                {
                    break;
                }

                else
                {
                    GetReferences(answer);
                }
            }
        }



        public static void GetReferences(string KBOnummer)
        {

            using (var client = new HttpClient())
            {

                //client-configuration

                client.DefaultRequestHeaders.Add("X-Request-Id", "6457dc94-0b98-4c1a-b5f8-98d8627b5177");                                        //version 4 UUID is required
                client.DefaultRequestHeaders.Add("NBB-CBSO-Subscription-Key", "f03301a6bfbe4f2897fd2b3df935e0bd");                               //subscription-key is required
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));        //Accept type is required


                var url = $"https://ws.uat2.cbso.nbb.be/authentic/legalEntity/{KBOnummer}/references";


                var response = client.GetAsync(url).GetAwaiter().GetResult();
                //response.EnsureSuccessStatusCode();
                var stringresponse = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();


                //response in lijst van refrence model-objecten steken
                List<ReferenceModel> referencemodels = JsonConvert.DeserializeObject<List<ReferenceModel>>(stringresponse);


                Console.WriteLine($"Info is: {referencemodels[1].Name}");
                Console.WriteLine();

            }

        }
    }

}
    