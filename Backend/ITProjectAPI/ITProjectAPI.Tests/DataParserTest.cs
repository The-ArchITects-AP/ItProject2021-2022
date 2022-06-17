using ITProjectAPI.Models;
using ITProjectAPI.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITProjectAPI.Tests
{
    [TestClass]
    public class DataParserTest
    {
        [TestMethod]
        public void GetEigenVermogenTest()
        {
            AccountingModel input = new AccountingModel()
            {
                Id = 1,
                ReferenceNumber = "1",
                EnterpriseName = "ROGER VDK+",
                Rubrics = new List<Rubric> {
                new Rubric() {
                    Id = 1,
                    Code = "10/15",
                    Value = "198649.97",
                    Period = "N",
                    DataType = "string",
                    TypeAmount = "1"
                }
            }
            };
            var expected = "198649.97";
            var result = DataParser.GetEigenVermogen(input);
            Assert.AreEqual(expected, result);
        }

        [TestMethod]
        public void GetSchuldenTest()
        {
            AccountingModel input = new AccountingModel()
            {
                Id = 1,
                ReferenceNumber = "1",
                EnterpriseName = "ROGER VDK+",
                Rubrics = new List<Rubric> {
                new Rubric() {
                    Id = 1,
                    Code = "17/49",
                    Value = "507732.6",
                    Period = "N",
                    DataType = "string",
                    TypeAmount = "1"
                }
            }
            };
            var expected = "507732.6";
            var result = DataParser.GetSchulden(input);
            Assert.AreEqual(expected, result);
        }

        [TestMethod]
        public void GetBedrijfswinst()
        {
            AccountingModel input = new AccountingModel()
            {
                Id = 1,
                ReferenceNumber = "1",
                EnterpriseName = "ROGER VDK+",
                Rubrics = new List<Rubric> {
                new Rubric() {
                    Id = 1,
                    Code = "9901",
                    Value = "115547.54",
                    Period = "N",
                    DataType = "string",
                    TypeAmount = "1"
                }
            }
            };
            var expected = "115547.54";
            var result = DataParser.GetBedrijfswinst(input);
            Assert.AreEqual(expected, result);
        }
    }
}
