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

        public async Task Create(string title, string? description, string? image, string price, bool isOnSale)
        {
            var knife = new Knife(title, description, image, price, isOnSale);

            await _context.Knifes.AddAsync(knife);
            await _context.SaveChangesAsync();
        }
        public async Task<List<Knife>> Get(string? search, string? sortItem, string? order)
        {
            var notesQuery = _context.Knifes
            .Where(n => string.IsNullOrWhiteSpace(search) ||
                        n.Title.ToLower().Contains(search.ToLower()));

            Expression<Func<Knife, object>> selectorKey = sortItem?.ToLower() switch
            {
                "date" => note => note.CreatedAt,
                "title" => note => note.Title,
                _ => note => note.Id
            };

            notesQuery = order == "desc"
                ? notesQuery.OrderByDescending(selectorKey)
                : notesQuery.OrderBy(selectorKey);

            return await notesQuery.ToListAsync();
        }
    }
}
