using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API
{
    public static class DateTimeConverter
    {
        public static long ToUnixTimeMiliseconds(this DateTime datetime)
        {
            return new DateTimeOffset(datetime).ToUnixTimeMilliseconds();
        }

    }
}