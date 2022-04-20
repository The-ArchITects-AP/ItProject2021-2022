using System;
namespace ITProjectAPI.Viewmodels
{
    public class AccountingView
    {
        public AccountingView()
        {
        }

        public string DepositDate { get; set; }
        public string EigenVermogen { get; set; }
        public string Schulden { get; set; }
        public string Bedrijfswinst { get; set; }
        public string Referentie { get; set; }

    }
}
