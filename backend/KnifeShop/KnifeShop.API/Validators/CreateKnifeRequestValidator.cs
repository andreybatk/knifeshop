using FluentValidation;
using KnifeShop.API.Contracts;

namespace KnifeShop.API.Validators
{
    public class CreateKnifeRequestValidator : AbstractValidator<CreateKnifeRequest>
    {
        public CreateKnifeRequestValidator()
        {
            RuleFor(x => x.Title)
                 .NotEmpty().WithMessage("Title cannot be empty.");

            RuleFor(x => x.Category)
                .NotEmpty().WithMessage("Category cannot be empty.");

            RuleFor(x => x.Price)
                .GreaterThan(0).WithMessage("Price must be greater than 0.");
        }
    }
}
