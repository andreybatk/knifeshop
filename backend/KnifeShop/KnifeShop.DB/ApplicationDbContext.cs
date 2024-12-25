using KnifeShop.DB.Models;
using Microsoft.EntityFrameworkCore;

namespace KnifeShop.DB
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        public DbSet<Knife> Knifes { get; set; }
    }
}
