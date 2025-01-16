using KnifeShop.DB.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace KnifeShop.DB.Repositories
{
    public class KnifeRepository : IKnifeRepository
    {
        private readonly ApplicationDbContext _context;

        public KnifeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<long> Create(string title, string category, string? description, string? image, List<string>? images, double price, bool isOnSale)
        {
            var dateNow = DateTime.UtcNow; // for postgree
            var knife = new Knife(title, category, description, image, images, price, isOnSale, dateNow);

            await _context.Knifes.AddAsync(knife);
            await _context.SaveChangesAsync();

            return knife.Id;
        }

        public async Task<Knife?> Edit(long id, string title, string category, string description, string? image, List<string>? images, double price, bool isOnSale)
        {
            var knife = await _context.Knifes.FirstOrDefaultAsync(x => x.Id == id);

            if(knife is not null)
            {
                knife.Title = title;
                knife.Category = category;
                knife.Description = description;
                knife.Price = price;
                knife.IsOnSale = isOnSale;

                if (image is not null) { knife.Image = image; }
                if (images is not null) { knife.Images = images; }
            }

            await _context.SaveChangesAsync();

            return knife;
        }

        public async Task<(List<Knife> Items, int TotalCount)> GetPaginated(string? search, string? sortItem, string? order, int page = 1, int pageSize = 10)
        {
            var notesQuery = _context.Knifes
                .Where(n => string.IsNullOrWhiteSpace(search) ||
                            n.Title.ToLower().Contains(search.ToLower()));

            Expression<Func<Knife, object>> selectorKey = sortItem?.ToLower() switch
            {
                "date" => note => note.CreatedAt,
                "title" => note => note.Title,
                "price" => note => note.Price,
                _ => note => note.Id
            };

            notesQuery = order == "desc"
                ? notesQuery.OrderByDescending(selectorKey)
                : notesQuery.OrderBy(selectorKey);

            int totalCount = await notesQuery.CountAsync();

            var items = await notesQuery
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (items, totalCount);
        }

        public async Task<List<Knife>> GetOnSale(string? search, string? sortItem, string? order)
        {
            var notesQuery = _context.Knifes
                .Where(n => n.IsOnSale)
                .Where(n => string.IsNullOrWhiteSpace(search) ||
                            n.Title.ToLower().Contains(search.ToLower()));

            Expression<Func<Knife, object>> selectorKey = sortItem?.ToLower() switch
            {
                "date" => note => note.CreatedAt,
                "title" => note => note.Title,
                "price" => note => note.Price,
                _ => note => note.Id
            };

            notesQuery = order == "desc"
                ? notesQuery.OrderByDescending(selectorKey)
                : notesQuery.OrderBy(selectorKey);

            return await notesQuery.ToListAsync();
        }

        public async Task<Knife?> Get(long id)
        {
            return await _context.Knifes.FindAsync(id);
        }

        public async Task<int> Delete(long id)
        {
            return await _context.Knifes.Where(x => x.Id == id).ExecuteDeleteAsync();
        }

        public async Task<List<Knife>> Get(int skip, int take)
        {
            return await _context.Knifes
                .Skip(skip)
                .Take(take)
                .ToListAsync();
        }
    }
}
