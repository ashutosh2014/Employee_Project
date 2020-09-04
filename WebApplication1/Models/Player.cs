using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularJSMVC.Models
{
    public class Player
    {
        public int PlayerId { set; get; }
        public string Name { get; set; }
        public string Club { get; set; }
        public string Country { get; set; }
    }
}
