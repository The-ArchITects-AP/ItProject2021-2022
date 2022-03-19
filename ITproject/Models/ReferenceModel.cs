using System;
namespace ITproject.Models
{
    public class ReferenceModel
    {
        public ReferenceModel()
        {
        }

        public string ReferenceNumber { get; set; }
        public string DepositDate { get; set; }
        public ExerciseDates ExerciseDates { get; set; }
        public string ModelType { get; set; }
        public string DepositType { get; set; }
        public string Language { get; set; }
        public string Currency { get; set; }
        public string EnterpriseNumber { get; set; }
        public string EnterpriseName { get; set; }
        public Address Address { get; set; }
        public string LegalForm { get; set; }
        public string LegalSituation { get; set; }
        public bool FullFillLegalValidation { get; set; }
        public object ActivityCode { get; set; }
        public string GeneralAssemblyDate { get; set; }
        public string AccountingDataURL { get; set; }
        public string DataVersion { get; set; }
        public object ImprovementDate { get; set; }
        public object CorrectedData { get; set; }

    }
}

