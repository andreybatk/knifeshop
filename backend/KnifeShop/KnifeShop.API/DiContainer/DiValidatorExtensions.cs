using FluentValidation;
using KnifeShop.API.Validators;

namespace KnifeShop.API.DiContainer
{
    public static class DiValidatorExtensions
    {
        public static void AddValidators(this IServiceCollection services)
        {
            services.AddValidatorsFromAssemblyContaining<CreateKnifeRequestValidator>();
            services.AddValidatorsFromAssemblyContaining<EditKnifeRequestValidator>();
        }
    }
}