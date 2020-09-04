using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace AngularJSMVC.Models
{
    public class TeamContext : DbContext
    {
        public DbSet<AngularJSMVC.Models.Player> Players { get; set; }
    }
}
