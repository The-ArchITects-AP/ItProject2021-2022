using System.Collections.Generic;

namespace ITProjectAPI.Models
{
    public class AccountingModel
    {
        public int Id { get; set; }
        public string ReferenceNumber { get; set; }
        public string EnterpriseName { get; set; }
        public List<Rubric> Rubrics { get; set; }

    }

    public class Rubric
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Value { get; set; }
        public string Period { get; set; }
        public string DataType { get; set; }
        public string TypeAmount { get; set; }

    }
}

