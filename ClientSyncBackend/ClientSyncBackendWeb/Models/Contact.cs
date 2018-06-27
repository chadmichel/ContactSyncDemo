using System;
namespace ClientSyncBackendWeb.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public string First { get; set; }
        public string Last { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Phone { get; set; }
        public DateTime LastModified { get; set; }
    }
}
