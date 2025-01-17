﻿using KnifeShop.DB.Models;

namespace KnifeShop.API.Contracts
{
    public class CreateKnifeRequest
    {
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public double Price { get; set; }
        public string? Description { get; set; }
        public bool IsOnSale { get; set; }
        public IFormFile? Image { get; set; }
        public List<IFormFile>? Images { get; set; }
        public double? OverallLength { get; set; }
        public double? BladeLength { get; set; }
        public double? ButtThickness { get; set; }
        public double? Weight { get; set; }
        public string? HandleMaterial { get; set; }
        public string? Country { get; set; }
        public string? Manufacturer { get; set; }
        public string? SteelGrade { get; set; }
    }
}