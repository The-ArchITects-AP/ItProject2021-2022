using Microsoft.EntityFrameworkCore;

namespace ITProjectAPI.Models
{
    public class NbbDbContext : DbContext
    {
        public NbbDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<ReferenceModel> ReferenceModels { get; set; }
        public DbSet<AccountingModel> AccountingModels { get; set; }


    }
}
