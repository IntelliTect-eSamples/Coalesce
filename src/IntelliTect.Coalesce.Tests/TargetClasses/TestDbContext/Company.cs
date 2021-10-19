﻿using System.Collections.Generic;
using IntelliTect.Coalesce.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using IntelliTect.Coalesce.Helpers;

namespace IntelliTect.Coalesce.Tests.TargetClasses.TestDbContext
{
    [Table("Company")]
    [Create(PermissionLevel = SecurityPermissionLevels.DenyAll)]
    public class Company
    {
        public int CompanyId { get; set; }
        [DefaultOrderBy]
        public string Name { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }

        [InverseProperty("Company")]
        public ICollection<Person> Employees { get; set; }

        [NotMapped]
        [ListText]
        public string AltName => Name + ": " + City;
    }
}