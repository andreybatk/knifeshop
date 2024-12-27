﻿namespace KnifeShop.API.Contracts
{
    public class GetKnifesPaginationRequest
    {
        public string? Search { get; set; }
        public string? SortItem { get; set; }
        public string? SortOrder { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}