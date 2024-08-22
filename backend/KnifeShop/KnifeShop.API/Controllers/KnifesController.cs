using KnifeShop.API.Contracts;
using KnifeShop.DB.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KnifeShop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KnifesController : ControllerBase
    {
        private readonly IKnifeRepository _knifeRepository;

        public KnifesController(IKnifeRepository knifeRepository)
        {
            _knifeRepository = knifeRepository;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateKnifeRequest request)
        {
            await _knifeRepository.Create(request.Title, request.Description, request.Image, request.Price, request.IsOnSale);
            return Ok();
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GetKnifesRequest request)
        {
            return Ok(await _knifeRepository.Get(request.Search, request.SortItem, request.SortOrder));
        }
    }
}