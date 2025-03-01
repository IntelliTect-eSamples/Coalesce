﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace IntelliTect.Coalesce.Helpers
{
    public static class EnumExtensions
    {
        public static string? GetDisplayName(this Enum value)
        {
            var customAttribute = value.GetType()
                                        .GetMember(value.ToString())
                                        .First()
                                        .GetCustomAttribute<DisplayAttribute>();
            if (customAttribute == null) return value.ToString();
            else return customAttribute.GetName();
        }
    }
}
