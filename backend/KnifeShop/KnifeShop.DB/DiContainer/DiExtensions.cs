using KnifeShop.DB.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace KnifeShop.DB.DiContainer
{
    public static class DiExtensions
    {
        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IKnifeRepository, KnifeRepository>();
        }
    }
}