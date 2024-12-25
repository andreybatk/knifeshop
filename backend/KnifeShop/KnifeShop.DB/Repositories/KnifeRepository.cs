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

        public async Task Create(string title, string category, string? description, string? image, List<string>? images, double price, bool isOnSale)
        {
            var dateNow = DateTime.UtcNow; // for postgree
            var knife = new Knife(title, category, description, image, images, price, isOnSale, dateNow);

            await _context.Knifes.AddAsync(knife);
            await _context.SaveChangesAsync();
        }

        public async Task<Knife?> Edit(long id, string title, string category, string description, string image, List<string>? images, double price, bool isOnSale)
        {
            var knife = await _context.Knifes.FirstOrDefaultAsync(x => x.Id == id);

            if(knife is not null)
            {
                knife.Title = title;
                knife.Category = category;
                knife.Description = description;
                knife.Image = image;
                knife.Images = images;
                knife.Price = price;
                knife.IsOnSale = isOnSale;
            }

            await _context.SaveChangesAsync();

            return knife;
        }

        public async Task<List<Knife>> Get(string? search, string? sortItem, string? order)
        {
            var notesQuery = _context.Knifes
            .Where(n => string.IsNullOrWhiteSpace(search) ||
                        n.Title.Contains(search, StringComparison.OrdinalIgnoreCase));

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

        public async Task<List<Knife>> Get(int skip, int take)
        {
            return await _context.Knifes
                .Skip(skip)
                .Take(take)
                .ToListAsync();
        }
    }
}
