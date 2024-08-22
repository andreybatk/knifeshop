namespace KnifeShop.DB.Models
{
    public class Knife
    {
        public Knife(string title, string? description, string? image, string price, bool isOnSale)
        {
            Title = title;
            Description = description;
            Image = image;
            Price = price;
            IsOnSale = isOnSale;
            CreatedAt = DateTime.UtcNow;
        }

        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Image { get; set; }
        public string Price { get; set; } = string.Empty;
        public bool IsOnSale { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
