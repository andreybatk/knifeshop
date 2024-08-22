namespace KnifeShop.API.Contracts
{
    public class CreateKnifeRequest
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Image { get; set; }
        public string Price { get; set; } = string.Empty;
        public bool IsOnSale { get; set; }
    }
}