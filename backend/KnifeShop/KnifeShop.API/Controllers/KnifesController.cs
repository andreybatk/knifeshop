using KnifeShop.API.Contracts;
using KnifeShop.BL.Services;
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
        private readonly IUploadFileService _fileService;

        public KnifesController(IKnifeRepository knifeRepository, IUploadFileService fileService)
        {
            _knifeRepository = knifeRepository;
            _fileService = fileService;
        }

        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromForm] CreateKnifeRequest request)
        {
            var imagePath = await _fileService.UploadImage(request.Image);
            var imagesPath = await _fileService.UploadImages(request.Images);

            await _knifeRepository.Create(request.Title, request.Category, request.Description, imagePath, imagesPath, request.Price, request.IsOnSale);
            return Ok();
        }

        [HttpPost("{id}")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> Edit([FromRoute] long id, [FromForm] EditKnifeRequest request)
        {
            var imagePath = await _fileService.UploadImage(request.Image);
            var imagesPath = await _fileService.UploadImages(request.Images);

            var result = await _knifeRepository.Edit(id, request.Title, request.Category, request.Description, imagePath, imagesPath, request.Price, request.IsOnSale);

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

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] long id)
        {
            return Ok(await _knifeRepository.Get(id));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] long id)
        {
            var result = await _knifeRepository.Delete(id);

            if (result != 0)
            {
                return Ok("Нож успешно удален.");
            }

            return NotFound("Нож не найден.");
        }

        //[HttpGet]
        //public async Task<IActionResult> Get(int skip, int take)
        //{
        //    return Ok();
        //}
    }
}