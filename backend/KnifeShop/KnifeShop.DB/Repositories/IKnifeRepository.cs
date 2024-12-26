using KnifeShop.DB.Models;

namespace KnifeShop.DB.Repositories
{
    public interface IKnifeRepository
    {
        Task Create(string title, string category, string? description, string? image, List<string>? images, double price, bool isOnSale);
        Task<Knife?> Edit(long id, string title, string category, string description, string? image, List<string>? images, double price, bool isOnSale);
        Task<Knife?> Get(long id);
        Task<List<Knife>> Get(string? search, string? sortItem, string? order);
        Task<int> Delete(long id);
    }
}