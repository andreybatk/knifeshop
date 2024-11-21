namespace KnifeShop.DB.Models
{
    public class Knife
    {
        public Knife(string title, string category, string? description, string? image, double price, bool isOnSale, DateTime? createdAt = null)
        {
            Title = title;
            Category = category;
            Description = description;
            Image = image;
            Price = price;
            IsOnSale = isOnSale;
            CreatedAt = createdAt ?? DateTime.Now;
        }

        public long Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Image { get; set; }
        public double Price { get; set; }
        public bool IsOnSale { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
