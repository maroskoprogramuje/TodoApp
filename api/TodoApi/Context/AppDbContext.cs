using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace TodoApi.Context
{
    public class AppDbContext : DbContext
    {

        protected readonly IConfiguration Configuration;
        public AppDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
        }

        public DbSet<Task> Tasks { get; set; }
        
    }
}
