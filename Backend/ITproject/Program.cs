using System;
using System.Collections.Generic;
using System.Net.Http;
using ITproject.Models;
using Newtonsoft.Json;



namespace ITproject

{
    class Program
    {
        static void Main(string[] args)
        {
           

            while (true)
            {
                var api = new NBBapi("http://localhost:3000/NBB/");

                Console.Write("Please enter a KBO number (q to quit): ");
                string answer = Console.ReadLine();

                if (answer.ToLower() == "q")
                {
                    break;
                }

                else
                {
                    api.GetReferences(answer);
                }
            }
        }

    }
}
