using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AngularJSMVC.Models;


namespace AngularJSMVC.Controllers
{
    public class PlayerController : Controller
    {
        private TeamContext _teamContext = null;

        public PlayerController()
        {
            _teamContext = new TeamContext();
        }
        public ActionResult Index()

        {

            return View();

        }
        [HttpPost]
        public JsonResult AddPlayer([FromBody] Player player)
        {
            _teamContext.Players.Add(player);
            _teamContext.SaveChanges();
            return Json(new { status = "Player added successfully" });
        }
        [HttpPost]
        public JsonResult UpdatePlayer([FromBody] Player player)
        {
            _teamContext.Entry(player).State = System.Data.Entity.EntityState.Modified;
            _teamContext.SaveChanges();
            return Json(new { status = "Player updated successfully" });
        }
        [HttpPost]
        public JsonResult DeletePlayer([FromBody]int id)
        {
            string status = "Player deleted successfully";
          
            try
            {
                Player player = _teamContext.Players.Where(c => c.PlayerId == id).SingleOrDefault();
                _teamContext.Players.Remove(player);
                _teamContext.SaveChanges();
            }
            catch(System.ArgumentNullException ex)
            {
                status = "Value Not Found";
            }
            return Json(new { status = status });
        }
        [HttpGet]
        public JsonResult GetPlayer()
        {
            List<Player> players = _teamContext.Players.ToList();
            return Json(new { list = players });
        }
        [HttpGet]
        public JsonResult GetPlayerById(int id)
        {
            Player player = _teamContext.Players.Where(c => c.PlayerId == id).SingleOrDefault();
            return Json(new { list = player });
        }
    }
}
