using KnifeShop.DB.Models;

namespace KnifeShop.DB.Repositories
{
    public interface IKnifeRepository
    {
        Task<long> Create(string title, string category, string? description, string? image, List<string>? images, double price, bool isOnSale);
        Task<Knife?> Edit(long id, string title, string category, string description, string? image, List<string>? images, double price, bool isOnSale);
        Task<Knife?> Get(long id);
        Task<List<Knife>> GetOnSale(string? search, string? sortItem, string? order);
        Task<(List<Knife> Items, int TotalCount)> GetPaginated(string? search, string? sortItem, string? order, int page, int pageSize);
        Task<int> Delete(long id);
    }
}