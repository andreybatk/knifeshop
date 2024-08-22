using KnifeShop.DB.Models;

namespace KnifeShop.DB.Repositories
{
    public interface IKnifeRepository
    {
        Task Create(string title, string? description, string? image, string price, bool isOnSale);
        Task<List<Knife>> Get(string? search, string? sortItem, string? order);
    }
}