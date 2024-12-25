namespace KnifeShop.API.Contracts
{
    public class EditKnifeRequest
    {
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public double Price { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public List<string>? Images { get; set; }
        public bool IsOnSale { get; set; }
    }
}
