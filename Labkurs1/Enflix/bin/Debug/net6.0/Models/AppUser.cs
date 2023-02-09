using Microsoft.AspNetCore.Identity;
namespace Enflix.Models
{
    public class AppUser : IdentityUser
    {
        public string Id { get; set; }
    }
}
