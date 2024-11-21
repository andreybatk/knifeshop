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
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Create([FromBody] CreateKnifeRequest request)
        {
            await _knifeRepository.Create(request.Title, request.Category, request.Description, request.Image, request.Price, request.IsOnSale);
            return Ok();
        }

        [HttpPost("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Edit([FromRoute] long id, [FromBody] EditKnifeRequest request)
        {
            var result = await _knifeRepository.Edit(id, request.Title, request.Category, request.Description, request.Image, request.Price, request.IsOnSale);

            if(result is null)
            {
                return BadRequest($"Edit knife with Id {id} is fault.");
            }

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GetKnifesRequest request)
        {
            return Ok(await _knifeRepository.Get(request.Search, request.SortItem, request.SortOrder));
        }
    }
}