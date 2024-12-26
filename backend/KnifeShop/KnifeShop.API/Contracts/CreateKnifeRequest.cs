namespace KnifeShop.API.Contracts
{
    public class CreateKnifeRequest
    {
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public double Price { get; set; }
        public string? Description { get; set; }
        public bool IsOnSale { get; set; }
        public IFormFile? Image { get; set; }
        public List<IFormFile>? Images { get; set; }
    }
}