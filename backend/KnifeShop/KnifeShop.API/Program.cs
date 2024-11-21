using KnifeShop.API.DiContainer;
using KnifeShop.DB;
using KnifeShop.DB.DiContainer;
using Microsoft.EntityFrameworkCore;

namespace KnifeShop.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var connectionString = builder.Configuration.GetConnectionString(
                "DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

            builder.Services.AddControllers();
            builder.Services.AddAuthentication()
            .AddGoogle(options =>
            {
                options.ClientId = "[Your Google Client ID]";
                options.ClientSecret = "[Your Google Client Secret]";
            });

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseNpgsql(connectionString);
            });

            builder.Services.AddRepositories();
            builder.Services.AddValidators();

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.WithOrigins("http://localhost:3000");
                    policy.AllowAnyHeader();
                    policy.AllowAnyMethod();
                });
            });

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCors();
            app.MapControllers();

            app.Run();
        }
    }
}
