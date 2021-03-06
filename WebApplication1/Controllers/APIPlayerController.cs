﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using AngularJSMVC.Models;

namespace AngularJSMVC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class APIPlayerController : ControllerBase
    {

        private readonly TeamContext _teamContext = null;

        public APIPlayerController()
        {
            _teamContext = new TeamContext();
        }
        [HttpGet]
        public ActionResult<IEnumerable<Player>> Get()
        {
            List<Player> players = _teamContext.Players.ToList();
            return players;
        }
        [HttpGet("{id}")]
        public ActionResult<Player> Get(int id)
        {
            Player player = _teamContext.Players.Where(c => c.PlayerId == id).SingleOrDefault();
            return player;
        }
        [HttpPost("search")]
        public ActionResult<IEnumerable<Player>> Post([FromBody]Search search)
        {
            List<Player> players = null;
            if (search.searchValue == "")
            {
                players = _teamContext.Players.ToList();
            }
            else
            {
                switch (search.searchField)
                {
                    case "Name":
                        players = _teamContext.Players.Where(c => c.Name.Contains(search.searchValue)).ToList();
                        break;
                    case "Club":
                        players = _teamContext.Players.Where(c => c.Club.Contains(search.searchValue)).ToList();
                        break;
                    case "Country":
                        players = _teamContext.Players.Where(c => c.Country.Contains(search.searchValue)).ToList();
                        break;
                    case "Search in all":
                        players = _teamContext.Players.Where(c => (c.Name.Contains(search.searchValue) || c.Country.Contains(search.searchValue) || c.Club.Contains(search.searchValue) )).ToList();
                        break;
                    default: 
                        break;
                }
            }
            
            return players;
        }
        [HttpPost]
        public string Post([FromBody] Player player)
        {
            _teamContext.Players.Add(player);
            _teamContext.SaveChanges();
            return  "Player added successfully";
        }
        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            string status = "Player deleted successfully";

            try
            {
                Player player = _teamContext.Players.Where(c => c.PlayerId == id).SingleOrDefault();
                _teamContext.Players.Remove(player);
                _teamContext.SaveChanges();
            }
            catch (System.ArgumentNullException ex)
            {
                status = "Value Not Found";
            }
            return status;
        }
        [HttpPut("{id}")]
        public string Put(int id,[FromBody] Player player)
        {
            _teamContext.Entry(player).State = System.Data.Entity.EntityState.Modified;
            _teamContext.SaveChanges();
            return "Player updated successfully";
        }
    }
}
