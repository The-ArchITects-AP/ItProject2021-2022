using System;
namespace ITProjectAPI.Viewmodels
{
    public class FullView
    {
        public FullView()
        {
        }

        public string EnterpriseName { get; set; }
        public string Street { get; set; }
        public string Number { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string DepositDate { get; set; }
        public string EigenVermogen { get; set; }
        public string Schulden { get; set; }
        public string Bedrijfswinst { get; set; }
    
    }
}
