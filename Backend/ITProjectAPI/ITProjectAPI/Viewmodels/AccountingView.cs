using System;
namespace ITProjectAPI.Viewmodels
{
    public class AccountingView
    {
        public AccountingView()
        {
        }

        public DateTime DepositDate { get; set; }
        public double EigenVermogen { get; set; }
        public double Schulden { get; set; }
        public double Bedrijfswinst { get; set; }
        
    }
}
