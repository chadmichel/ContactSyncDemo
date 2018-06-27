using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClientSyncBackendWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.IO;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ClientSyncBackendWeb.Controllers
{
    
    public class ContactsController : Controller
    {
        static List<Contact> _contacts = null;

        List<Contact> Contacts 
        {
            get
            {
                if (_contacts == null)
                {
                    var json = System.IO.File.ReadAllText("Contacts.json");
                    _contacts = new List<Contact>(Newtonsoft.Json.JsonConvert.DeserializeObject<Contact[]>(json));
                }
                return _contacts;
            }
        }

        [HttpGet]
        public int Count()
        {
            return Contacts.Count;
        }

        [HttpGet]
		public Contact[] All()
        {
            return Contacts.ToArray();
        }

        [HttpGet]
        public Contact[] Page(int pageNumber, int pageSize, DateTime lastModTime)
        {
            var skipCount = pageNumber * pageSize;
            return Contacts.Where(c => c.LastModified >= lastModTime).Skip(skipCount).Take(pageSize).ToArray();
        }

        [HttpGet]
        public DateTime Update(int number)
        {
            var time = DateTime.Now;
            for (var i = 0; i < number; i++) 
            {
                Contacts[i].LastModified = time;
            }
            return time;
        }
    }
}
