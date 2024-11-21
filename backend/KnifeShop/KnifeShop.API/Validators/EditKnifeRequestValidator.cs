using FluentValidation;
using KnifeShop.API.Contracts;

namespace KnifeShop.API.Validators
{
    public class EditKnifeRequestValidator : AbstractValidator<EditKnifeRequest>
    {
        public EditKnifeRequestValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title cannot be empty.");

            RuleFor(x => x.Category)
                .NotEmpty().WithMessage("Category cannot be empty.");

            RuleFor(x => x.Price)
                .GreaterThan(0).WithMessage("Price must be greater than 0.");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description cannot be empty.");

            RuleFor(x => x.Image)
                .NotEmpty().WithMessage("Image cannot be empty.");
        }
    }
}