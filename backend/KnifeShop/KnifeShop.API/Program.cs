using KnifeShop.API.DiContainer;
using KnifeShop.DB.DiContainer;
using KnifeShop.BL.DiContainer;
using KnifeShop.DB;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.Extensions.FileProviders;

namespace KnifeShop.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var connectionString = builder.Configuration.GetConnectionString(
                "DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

            var admins = builder.Configuration.GetSection("Admins:admin").Get<List<string>>();

            builder.Services.AddControllers();
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
            })
            .AddCookie()
            .AddGoogle(options =>
            {
                options.ClientId = builder.Configuration.GetSection("Google:ClientId").Get<string>() ?? throw new InvalidOperationException("Google 'ClientId' not found.");
                options.ClientSecret = builder.Configuration.GetSection("Google:ClientSecret").Get<string>() ?? throw new InvalidOperationException("Google 'ClientSecret' not found.");

                options.Events.OnCreatingTicket = context =>
                {
                    var claims = context.Identity?.Claims?.ToList() ?? new List<Claim>();
                    var email = context.Identity?.Name;

                    if (admins != null && email != null && admins.Contains(email))
                    {
                        claims.Add(new Claim(ClaimTypes.Role, "Admin"));
                    }
                    else
                    {
                        claims.Add(new Claim(ClaimTypes.Role, "User"));
                    }

                    context.Identity?.AddClaims(claims);
                    return Task.CompletedTask;
                };
            });

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseNpgsql(connectionString);
            });

            builder.Services.AddRepositories();
            builder.Services.AddServices();

            builder.Services.AddValidators();

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.AllowAnyOrigin();
                    //policy.WithOrigins("http://localhost:3000");
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

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Uploads")),
                RequestPath = "/Uploads"
            });

            app.UseHttpsRedirection();
            app.UseCors();
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}
